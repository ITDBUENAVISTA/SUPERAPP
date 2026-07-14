export interface CustomerFormList {

    customer_id: string;

    customer_name: string;

    lot: string;

    financing_term: string;

    tenant: string;

    status: string;

    viewed_at: Date | null;

    viewed_by: string | null;

    reviewed_at: Date | null;

    reviewed_by: string | null;

    created_at: Date;

}