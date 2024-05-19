// import { Test, TestingModule } from '@nestjs/testing';
// import { AccessKeyService } from './access-key.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { AccessKey } from '../entities/access-key.entity';
// import { Repository } from 'typeorm';
// import { CreateAccessKeyDTO } from '../dto/create-access-key.dto';
// import { UpdateAccessKeyDTO } from '../dto/update-access-key.dto';
// import { DisableAccessKeyDTO } from '../dto/disable-access-key.dto';

// describe('AccessKeyService', () => {
//   let service: AccessKeyService;
//   let accessKeyRepository: Repository<AccessKey>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AccessKeyService,
//         {
//           provide: getRepositoryToken(AccessKey),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     service = module.get<AccessKeyService>(AccessKeyService);
//     accessKeyRepository = module.get<Repository<AccessKey>>(getRepositoryToken(AccessKey));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('generateKey', () => {
//     it('should generate a new access key', async () => {
//       const createAccessKeyDto: CreateAccessKeyDTO = {
//         owner: 'testOwnerId',
//         requestRateLimit: 100,
//       };

//       const user = new Account();
//       user.id = 'testOwnerId';
//       jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

//       const accessKey = new AccessKey();
//       jest.spyOn(accessKeyRepository, 'save').mockResolvedValue(accessKey);

//       const result = await service.generateKey(createAccessKeyDto);

//       expect(result).toEqual(accessKey);
//       expect(accessKey.owner).toEqual(user);
//     });
//   });

//   describe('updateAccessKey', () => {
//     it('should update an access key', async () => {
//       const updateAccessKeyDto: UpdateAccessKeyDTO = {
//         requesterId: 'testUserId',
//         accessKeyID: 'testAccessKeyId',
//         expiresAt: new Date(),
//         requestRateLimit: 100,
//       };

//       const user = new Account();
//       user.id = 'testUserId';
//       user.role = AccountRole.ADMIN;
//       jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

//       const accessKey = new AccessKey();
//       accessKey.id = 'testAccessKeyId';
//       jest.spyOn(accessKeyRepository, 'findOne').mockResolvedValue(accessKey);

//       const updatedAccessKey = new AccessKey();
//       jest.spyOn(accessKeyRepository, 'save').mockResolvedValue(updatedAccessKey);

//       const result = await service.updateAccessKey(updateAccessKeyDto);

//       expect(result).toEqual(updatedAccessKey);
//       expect(result.expiresAt).toEqual(updateAccessKeyDto.expiresAt);
//       expect(result.requestRateLimit).toEqual(updateAccessKeyDto.requestRateLimit);
//     });

//     // Write more test cases for different scenarios (e.g., user not found, access key not found, etc.)
//   });

//   describe('disableAccessKey', () => {
//     it('should disable an access key', async () => {
//       const disableAccessKeyDTO: DisableAccessKeyDTO = {
//         accessKeyID: 'testAccessKeyId',
//         requestedBy: 'testUserId',
//       };

//       const user = new Account();
//       user.id = 'testUserId';
//       jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

//       const accessKey = new AccessKey();
//       accessKey.id = 'testAccessKeyId';
//       accessKey.owner = user;
//       jest.spyOn(accessKeyRepository, 'findOne').mockResolvedValue(accessKey);

//       const updatedAccessKey = new AccessKey();
//       jest.spyOn(accessKeyRepository, 'save').mockResolvedValue(updatedAccessKey);

//       const result = await service.disableAccessKey(disableAccessKeyDTO);

//       expect(result).toEqual(updatedAccessKey);
//       expect(result.disabled).toBe(true);
//     });

//     // Write more test cases for different scenarios (e.g., user not found, access key not found, user is not the owner, etc.)
//   });

//   describe('enableAccessKey', () => {
//     it('should enable an access key', async () => {
//       const disableAccessKeyDTO: DisableAccessKeyDTO = {
//         accessKeyID: 'testAccessKeyId',
//         requestedBy: 'testUserId',
//       };

//       const user = new Account();
//       user.id = 'testUserId';
//       jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

//       const accessKey = new AccessKey();
//       accessKey.id = 'testAccessKeyId';
//       accessKey.owner = user;
//       accessKey.disabled = true;
//       jest.spyOn(accessKeyRepository, 'findOne').mockResolvedValue(accessKey);

//       const updatedAccessKey = new AccessKey();
//       jest.spyOn(accessKeyRepository, 'save').mockResolvedValue(updatedAccessKey);

//       const result = await service.enableAccessKey(disableAccessKeyDTO);

//       expect(result).toEqual(updatedAccessKey);
//       expect(result.disabled).toBe(false);
//     });
//   });
// });