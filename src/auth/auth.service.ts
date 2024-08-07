import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/user-logs/user-logs.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger (AuthService.name);
  constructor(
    private readonly accountService: AccountsService,
    private readonly userLogService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto:CreateAuthDto): Promise<any> {
    const { username, password } = authDto;

    const account = await this.accountService.findByUsername(username);

    if ( !account || password !== account.password ) {
        throw new UnauthorizedException('Invalid credentials');
      }
     // Generate JWT token
    const token = this.jwtService.sign({ username: account.username, userId: account.id });

    await this.userLogService.logAttempt(account.id, username);

    return {
      token,
      user: {
        id: account.id,
        username: account.username,
      },
    };
  }
}
