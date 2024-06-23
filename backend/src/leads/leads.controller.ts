// leads.controller.ts
import { Controller, Get, Post, Query } from '@nestjs/common';
import { AmoCRMService } from './amo-crm.service';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly amoCRMService: AmoCRMService) {}

  @Get()
  async findAll(@Query('query') query: string) {
    const leads = await this.amoCRMService.findAllLeads(query);
    return leads.map(
      (lead: {
        id: any;
        name: any;
        price: any;
        responsible_user_id: any;
        status_id: any;
        pipeline_id: any;
        created_at: any;
        updated_at: any;
        closed_at: any;
        closest_task_at: any;
        is_deleted: any;
        custom_fields_values: any;
        score: any;
        account_id: any;
        labor_cost: any;
        _embedded: { tags: any[]; companies: any[] };
      }) => ({
        id: lead.id,
        name: lead.name,
        price: lead.price,
        responsibleUserId: lead.responsible_user_id,
        statusId: lead.status_id,
        pipelineId: lead.pipeline_id,
        createdAt: lead.created_at,
        updatedAt: lead.updated_at,
        closedAt: lead.closed_at,
        closestTaskAt: lead.closest_task_at,
        isDeleted: lead.is_deleted,
        customFieldsValues: lead.custom_fields_values,
        score: lead.score,
        accountId: lead.account_id,
        laborCost: lead.labor_cost,
        tags: lead._embedded.tags.map((tag) => tag.name), // Извлекаем имена тегов
        companies: lead._embedded.companies.map((company) => ({
          id: company.id,
          name: company.name,
          // ... другие поля компании
          // Например:
          //  address: company.address,
          //  phone: company.phone,
          //  email: company.email,
          //  website: company.website,
          //  // ...
        })), // Извлекаем информацию о компаниях
      }),
    );
  }

  @Post()
  create() {
    // логика для обработки POST запроса
    return 'This action adds a new lead';
  }
}
