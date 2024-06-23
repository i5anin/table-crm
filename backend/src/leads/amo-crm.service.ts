import { Injectable } from '@nestjs/common';
import * as AmoCRM from 'amocrm';
import { CreateLeadDto } from './create-lead.dto';

@Injectable()
export class AmoCRMService {
  private readonly amo: AmoCRM.Client;
  private accessToken: string;

  constructor() {
    this.amo = new AmoCRM.Client({
      clientId: process.env.AMOCRM_CLIENT_ID,
      clientSecret: process.env.AMOCRM_CLIENT_SECRET,
      redirectUri: process.env.AMOCRM_REDIRECT_URI,
    });
  }

  async authenticate(code: string): Promise<void> {
    // Exchange authorization code for access token
    this.accessToken = await this.amo.auth.getAccessToken(code);
  }

  async findAllLeads(query: string = null) {
    if (!this.accessToken) {
      throw new Error('AmoCRM is not authenticated.');
    }

    // Set the access token for API calls
    this.amo.setAccessToken(this.accessToken);
    return await this.amo.api.deals.get({ query });
  }

  async createLead(createLeadDto: CreateLeadDto): Promise<any> {
    if (!this.accessToken) {
      throw new Error('AmoCRM is not authenticated.');
    }

    // Set the access token for API calls
    this.amo.setAccessToken(this.accessToken);
    return await this.amo.api.deals.create(createLeadDto);
  }
}
