    export interface CustomerForm {

    lot: string;
    financing_term: string;

    full_name: string;
    age: number | null;
    identity_number: string;
    marital_status: string | null;
    profession: string | null;
    email: string | null;
    country: string | null;
    department: string | null;
    municipality: string | null;
    address: string | null;
    phone: string | null;
    monthly_income: number | null;

    isMancomunado: boolean;

    full_name_second: string | null;
    age_second: number | null;
    identity_number_second: string | null;
    marital_status_second: string | null;
    profession_second: string | null;
    email_second: string | null;
    country_second: string |null;
    department_second: string | null;
    municipality_second: string | null;
    address_second: string | null;
    phone_second: string | null;
    monthly_income_second: number | null;

    beneficiary_name: string | null;
    beneficiary_identity: string | null;

    reference1_name: string | null;
    reference1_phone: string | null;

    reference2_name: string | null;
    reference2_phone: string | null;

    customer_dni_url: string | null;
    customer_second_dni_url: string | null;
    beneficiary_dni_url: string | null;

    customer_id: number;
    created_by: number | null;
    observations: string | null;

}