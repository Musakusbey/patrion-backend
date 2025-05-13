import { Test, TestingModule } from '@nestjs/testing';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

describe('LogsController', () => {
  let controller: LogsController;
  let service: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [
        {
          provide: LogsService,
          useValue: {
            createLog: jest.fn(),
            findByUser: jest.fn().mockResolvedValue([
              {
                id: 1,
                userId: 1,
                action: 'test_action',
                timestamp: new Date(),
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<LogsController>(LogsController);
    service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return logs for user', async () => {
    const req = { user: { userId: 1, role: 'admin' } };
    const result = await controller.getLogs(req as any);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.message).toBe('Tüm loglar başarıyla listelendi.');
  });
});
