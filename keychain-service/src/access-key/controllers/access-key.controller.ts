import { Controller, Header, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AccessKeyService } from '../services/access-key.service';
import { CreateAccessKeyDTO } from '../dto/create-access-key.dto';
import { UpdateAccessKeyDTO } from '../dto/update-access-key.dto';
import { DisableAccessKeyDTO } from '../dto/disable-access-key.dto';
import { EnableAccessKeyDTO } from '../dto/enable-access-key.dto';
import { AccessKey } from '../entities/access-key.entity';

@Controller('access-key')
export class AccessKeyController {
    constructor(private readonly accessKeyService: AccessKeyService) {}
    
    @Get()
    @Header('Content-Type', 'application/json')
    findAll(): object {
        return this.accessKeyService.findAll();
    }


    @Post()
    @Header('Content-Type', 'application/json')
    async createAccessKey(@Body() createAccessKeyDTO: CreateAccessKeyDTO): Promise<AccessKey> {
        return await this.accessKeyService.generateKey(createAccessKeyDTO);
    }


    @Get(':id')
    @Header('Content-Type', 'application/json')
    async detailAccessKey(@Param('id') id: string): Promise<AccessKey> {
        return await this.accessKeyService.getAccessKeyById(id);
    }

    // Method to update access key
    @Patch(':id')
    @Header('Content-Type', 'application/json')
    async updateAccessKey(@Param('id') id: string, @Body() updateAccessKeyDTO: UpdateAccessKeyDTO): Promise<AccessKey> {
        return await this.accessKeyService.updateAccessKey(id, updateAccessKeyDTO);
    }

    // Method to disable access key diasble/:id
    @Patch('disable/:id')
    @Header('Content-Type', 'application/json')
    async disableAccessKey(@Param('id') id: string, @Body() disableAccessKeyDTO: DisableAccessKeyDTO): Promise<AccessKey> {
        return await this.accessKeyService.disableAccessKey(id, disableAccessKeyDTO);
    }

    // Method to enable access key
    @Patch('enable/:id')
    @Header('Content-Type', 'application/json')
    async enableAccessKey(@Param('id') id: string, @Body() enableAccessKeyDTO: EnableAccessKeyDTO): Promise<AccessKey> {
        return await this.accessKeyService.enableAccessKey(id, enableAccessKeyDTO);
    }

}

