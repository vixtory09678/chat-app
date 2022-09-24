import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class UserResponse {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  displayName: string;

  @Expose()
  @ApiProperty({ nullable: true })
  profileImageUrl?: string;

  @Expose()
  @ApiProperty()
  profileColor: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  displayName: string;
}
