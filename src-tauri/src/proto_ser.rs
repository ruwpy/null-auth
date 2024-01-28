use crate::proto::oauth::{MigrationPayload, OtpParameters};
use base64::{engine::general_purpose, Engine};
use protobuf::{Message, RepeatedField};

pub struct Account {
    pub secret: String,
    pub name: String,
    pub issuer: String,
}

impl Account {
    pub fn new(secret: String, name: String, mut issuer: String) -> Account {
        if issuer.is_empty() {
            issuer = name.clone();
        }

        Account {
            secret,
            name,
            issuer,
        }
    }
}

pub fn serealize_proto_otp(data: Vec<Account>) -> Vec<u8> {
    let mut payload = MigrationPayload::default();

    let otp_params: Vec<OtpParameters> = data
        .iter()
        .map(|acc| {
            let mut param = OtpParameters::new();

            param.set_issuer(acc.issuer.clone());
            param.set_name(acc.name.clone());
            param.set_secret(
                general_purpose::STANDARD
                    .decode(acc.secret.clone())
                    .unwrap(),
            );

            param
        })
        .collect();

    payload.set_otp_parameters(RepeatedField::from_vec(otp_params));

    let result: Vec<u8> = payload.write_to_bytes().unwrap();

    result
}

pub fn deserealize_proto_otp(data: String) -> Vec<Account> {
    let decoded_data = general_purpose::STANDARD.decode(data).unwrap();

    let payload = MigrationPayload::parse_from_bytes(&decoded_data).unwrap();

    println!("{:?}", &payload);

    let otp_params = payload.otp_parameters.into_vec();

    let accounts: Vec<Account> = otp_params
        .iter()
        .map(|acc| {
            Account::new(
                general_purpose::STANDARD.encode(acc.secret.clone()),
                acc.name.clone(),
                acc.issuer.clone(),
            )
        })
        .collect();

    accounts
}
