import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';

describe('LeadsController', () => {
  let controller: LeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  it('should return "This action returns all leads" on GET request', () => {
    expect(controller.findAll()).toBe('This action returns all leads');
  });

  it('should return "This action adds a new lead" on POST request', () => {
    expect(controller.create()).toBe('This action adds a new lead');
  });
});
