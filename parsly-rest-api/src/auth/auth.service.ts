import { TokenDto } from './jwt/token.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './../user/dto/user.dto';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: UserDto) {
    data.password = await this.hashPassword(data.password);

    try {
      const user = await this.userService.createUser(data);

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${data.email} already in use.`);
      } else {
        throw new Error(e);
      }
    }
  }

  async login(data: UserDto): Promise<TokenDto> {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${data.email}`);
    }

    const passwordValid = await bcrypt.compare(data.password, user.password);

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  private generateTokens(payload: { userId: number }): TokenDto {
    return {
      accessToken: this.generateAccessToken(payload),
    };
  }

  generateAccessToken(payload: { userId: number }): string {
    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string) {
    const SALT_ROUNDS = 10;

    return await bcrypt.hash(password, SALT_ROUNDS);
  }
}
