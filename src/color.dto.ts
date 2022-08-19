import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ColorData {
  @IsString()
  label: string;

  @IsNumber()
  value: number;

  @IsString()
  color: string;

  @IsBoolean()
  isDashboard?: boolean;
}
