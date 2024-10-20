"use client";
import { useWebSocketContext } from "@/contexts/ws";
import styles from "./page.css";

export default function ProntuarioPage() {
  const ws = useWebSocketContext();

  const chart = {
    id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
    logged_at: "2024-10-01T21:39:05.847071-03:00",
    created_at: "2024-10-01T21:39:05.904735-03:00",
    patient_id: null,
    name: "Alex",
    cpf: "40501945890",
    birth_date: "2024-07-30",
    only_age: false,
    age: null,
    known_event_time: true,
    ictus: "2024-09-30T20:27:00-03:00",
    last_seen_well_at: null,
    history_collected_with: "Mamae",
    history: "Tava no samu, seilá",
    rankin_score: 2,
    rankin_description: "Incapacidade leve",
    other_medicines: "dorflex",
    absolute_contraindications: [
      {
        id: "e64b931c-415d-4f71-8708-5be49a12e42c",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        absolute_contraindication_template_id:
          "641312da-2a85-46a7-86aa-a32541391319",
        response: "Sim",
        system_response: null,
        system_response_free_text: null,
        treatment_response: null,
        absolute_contraindication_template: {
          id: "641312da-2a85-46a7-86aa-a32541391319",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 1,
          response_group_template_id: "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
          description:
            "O paciente sofreu traumatismo cranioencefálico grave nos últimos 3 meses?",
          system_response_required_when: null,
          system_response_group_template_id: null,
          treatment_response_required_when: null,
          treatment_response_group_template_id: null,
        },
      },
      {
        id: "301ce40a-74ff-4a98-a69b-c9c739161d0b",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        absolute_contraindication_template_id:
          "13ed6026-27fb-44bb-93f3-f4c5038ded1d",
        response: "Não",
        system_response: null,
        system_response_free_text: null,
        treatment_response: null,
        absolute_contraindication_template: {
          id: "13ed6026-27fb-44bb-93f3-f4c5038ded1d",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 2,
          response_group_template_id: "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
          description:
            "O paciente tem qualquer relato de sangramento intracraniano ou meníngeo?",
          system_response_required_when: null,
          system_response_group_template_id: null,
          treatment_response_required_when: null,
          treatment_response_group_template_id: null,
        },
      },
      {
        id: "bb081f93-daad-4039-9bd4-4e6b61249844",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        absolute_contraindication_template_id:
          "349eac3d-3154-4ead-91f9-df2a0a3e1ad2",
        response: "Não sei",
        system_response: null,
        system_response_free_text: null,
        treatment_response: null,
        absolute_contraindication_template: {
          id: "349eac3d-3154-4ead-91f9-df2a0a3e1ad2",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 3,
          response_group_template_id: "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
          description:
            "O paciente possui história de sangramento intestinal ativo no momento?",
          system_response_required_when: null,
          system_response_group_template_id: null,
          treatment_response_required_when: null,
          treatment_response_group_template_id: null,
        },
      },
      {
        id: "72092473-7515-41c6-90df-d4ba761166fa",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        absolute_contraindication_template_id:
          "1d8df8ab-956a-47ec-900a-0273b08da1c9",
        response: "Sim",
        system_response: null,
        system_response_free_text: null,
        treatment_response: null,
        absolute_contraindication_template: {
          id: "1d8df8ab-956a-47ec-900a-0273b08da1c9",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 4,
          response_group_template_id: "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
          description:
            "O paciente possui história de febre, petéquias, infecção de corrente sanguínea ou lesão valvar prévia?",
          system_response_required_when: null,
          system_response_group_template_id: null,
          treatment_response_required_when: null,
          treatment_response_group_template_id: null,
        },
      },
      {
        id: "bde2bb6c-f1a2-4cfb-a3c2-1b85c889d802",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        absolute_contraindication_template_id:
          "bfed0be8-088b-4ef8-815e-8501fdac5cbd",
        response: "Não",
        system_response: null,
        system_response_free_text: null,
        treatment_response: null,
        absolute_contraindication_template: {
          id: "bfed0be8-088b-4ef8-815e-8501fdac5cbd",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 5,
          response_group_template_id: "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
          description:
            "O paciente possui história de Neurocirurgia nos últimos 3 meses?",
          system_response_required_when: null,
          system_response_group_template_id: null,
          treatment_response_required_when: null,
          treatment_response_group_template_id: null,
        },
      },
      {
        id: "77a53f7d-93d6-4761-814f-42c90fb7c6ab",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        absolute_contraindication_template_id:
          "c7d8ac4d-b2cd-42f8-8458-f26dc3411cc3",
        response: "Não sei",
        system_response: null,
        system_response_free_text: null,
        treatment_response: null,
        absolute_contraindication_template: {
          id: "c7d8ac4d-b2cd-42f8-8458-f26dc3411cc3",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 6,
          response_group_template_id: "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
          description:
            "O paciente possui história de AVC isquêmico nos últimos 3 meses?",
          system_response_required_when: null,
          system_response_group_template_id: null,
          treatment_response_required_when: null,
          treatment_response_group_template_id: null,
        },
      },
      {
        id: "26d25b1d-2f90-48ed-9a04-dcda2d3d7ec7",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        absolute_contraindication_template_id:
          "d86e6478-5d57-400b-b07e-c98cf606f3df",
        response: "Sim",
        system_response: "Outro",
        system_response_free_text: "asdasd",
        treatment_response: "Sim",
        absolute_contraindication_template: {
          id: "d86e6478-5d57-400b-b07e-c98cf606f3df",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 7,
          response_group_template_id: "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
          description: "O paciente possui neoplasia?",
          system_response_required_when: ["Sim"],
          system_response_group_template_id:
            "662327b4-bbd3-4bbc-86e0-bd6bfaab3650",
          treatment_response_required_when: ["Sim"],
          treatment_response_group_template_id:
            "49c8d427-c29b-4de0-a6e9-5fa1e0487b7e",
        },
      },
    ],
    anticoagulants: [
      {
        id: "ff332363-856a-4251-b74d-65395b01bc53",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "4a770bbd-f183-4aad-b8bd-0c6e043c458d",
        response: "Não",
        taken_at: null,
        anticoagulant_template: {
          id: "4a770bbd-f183-4aad-b8bd-0c6e043c458d",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 1,
          name: "Marevan (warfarina)",
          is_free_text: false,
        },
      },
      {
        id: "f8812c12-74a0-4c25-92e6-f5678db1e2c9",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "edfa772e-ac15-4e8c-893c-d757a6351bd5",
        response: "Não",
        taken_at: null,
        anticoagulant_template: {
          id: "edfa772e-ac15-4e8c-893c-d757a6351bd5",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 2,
          name: "Rivaroxabana (xarelto)",
          is_free_text: false,
        },
      },
      {
        id: "02eadc3e-4226-46df-b9fc-800abcc28513",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "ee25a610-de51-4c70-89a1-8125a6179aad",
        response: "Sim",
        taken_at: "2024-09-29T20:28:00-03:00",
        anticoagulant_template: {
          id: "ee25a610-de51-4c70-89a1-8125a6179aad",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 3,
          name: "Apixabana",
          is_free_text: false,
        },
      },
      {
        id: "01ee3b54-a48b-401b-8b82-9fea1377a6a1",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "4d35c02f-da5f-46a9-9fe0-7bb7bdb4e061",
        response: "Não sei",
        taken_at: null,
        anticoagulant_template: {
          id: "4d35c02f-da5f-46a9-9fe0-7bb7bdb4e061",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 4,
          name: "Dabigatrana",
          is_free_text: false,
        },
      },
      {
        id: "cff8562b-0284-4a08-81cb-28fe7a1155aa",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "d8e90b92-4a9c-433e-b3db-c537fe7bb39f",
        response: "Não sei",
        taken_at: null,
        anticoagulant_template: {
          id: "d8e90b92-4a9c-433e-b3db-c537fe7bb39f",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 5,
          name: "Foundaparinux",
          is_free_text: false,
        },
      },
      {
        id: "a32b5b99-fdc3-465c-9ac7-6407c3cfd37c",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "efaeb752-72cf-4969-81f3-63629f14fd8b",
        response: "Não",
        taken_at: null,
        anticoagulant_template: {
          id: "efaeb752-72cf-4969-81f3-63629f14fd8b",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 6,
          name: "Heparina não fracionada plena",
          is_free_text: false,
        },
      },
      {
        id: "81c9d8b4-3998-44f5-8f19-3ed2d86699a6",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "202daa1e-478c-4654-8403-446a7f1cebbb",
        response: "Sim",
        taken_at: "2024-10-22T20:28:00-03:00",
        anticoagulant_template: {
          id: "202daa1e-478c-4654-8403-446a7f1cebbb",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 7,
          name: "Heparina de baixo peso molecular plena",
          is_free_text: false,
        },
      },
      {
        id: "32a22a08-ffdf-45b1-8ca1-8348857ba84f",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        anticoagulant_template_id: "a46fca59-6ed9-4aba-87d8-814033f3839e",
        response: "Desalex",
        taken_at: null,
        anticoagulant_template: {
          id: "a46fca59-6ed9-4aba-87d8-814033f3839e",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 8,
          name: "Outros Anticoagulantes",
          is_free_text: true,
        },
      },
    ],
    comorbidities: [
      {
        id: "fd4ae968-6616-4239-bc76-a70f3d57a678",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        comorbity_template_id: "240d5618-40cc-4d7f-93c7-d13a98a9bd54",
        response: true,
        response_text: null,
        comorbity_template: {
          id: "240d5618-40cc-4d7f-93c7-d13a98a9bd54",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 3,
          name: "Dislipidemia",
          is_free_text: false,
        },
      },
      {
        id: "60ed087c-979c-4637-a01b-e2db4f07bbad",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        comorbity_template_id: "d9df35c9-4da7-4dc5-a92b-51b09c6cbe51",
        response: true,
        response_text: null,
        comorbity_template: {
          id: "d9df35c9-4da7-4dc5-a92b-51b09c6cbe51",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 4,
          name: "Doenca renal crônica",
          is_free_text: false,
        },
      },
      {
        id: "364dd652-64db-444a-9a24-fad71e8c8352",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        comorbity_template_id: "babb6b0e-bc00-406a-afcc-f01ca02e38a6",
        response: true,
        response_text: null,
        comorbity_template: {
          id: "babb6b0e-bc00-406a-afcc-f01ca02e38a6",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 5,
          name: "Tabagismo",
          is_free_text: false,
        },
      },
      {
        id: "251a22e5-b8a6-49a3-92f7-a4f402f69f46",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        comorbity_template_id: "5bb8b7d2-178e-48d6-8413-040b92e5d77c",
        response: true,
        response_text: "Jogador de LOL",
        comorbity_template: {
          id: "5bb8b7d2-178e-48d6-8413-040b92e5d77c",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 9,
          name: "Outros",
          is_free_text: true,
        },
      },
      {
        id: "739ea8ec-8a78-4fd7-928a-0ef773bb12d6",
        logged_at: "2024-10-01T21:39:05.904735-03:00",
        chart_id: "f6b4c622-60af-4d1d-bae1-c60b6a1f05dc",
        comorbity_template_id: "7d0f217e-f705-49c4-934b-dbb2c7623b34",
        response: true,
        response_text: null,
        comorbity_template: {
          id: "7d0f217e-f705-49c4-934b-dbb2c7623b34",
          logged_at: "2024-10-01T21:29:15.717719-03:00",
          sort_value: 6,
          name: "Epilepsia",
          is_free_text: false,
        },
      },
    ],
  };

  return (
    <div className="container pt-5 justify-content-center">
      <section className="flex list-group">
        <div className="list-group-item">
          <div className="input-group">
            <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.name}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.cpf}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">CPF</label>
            </div>
            <div className="form-floating">
              <input
                type="date"
                className="form-control no-border"
                id="floatingInput"
                value={chart.birth_date}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">Data de nascimento</label>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control no-border"
                id="floatingInput"
                value={12}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">Idade</label>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="input-group">
            <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.known_event_time}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">Tempo de evento conhecido?</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.ictus}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">ICTUS</label>
            </div>

            {/* <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.last_seen_well_at}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">Ultima vez visto bem</label>
            </div> */}
          </div>
        </div>

        <div className="list-group-item">
          <div className="form-floating">
            <input
              type="text"
              className="form-control no-border"
              id="floatingInput"
              value={chart.history_collected_with}
              placeholder=""
              readOnly
            />
            <label htmlFor="floatingInput">História coletada com</label>
          </div>

          <div className="form-floating">
            <textarea
              type="text"
              className="form-control no-border"
              id="floatingInput"
              value={chart.history}
              placeholder=""
              readOnly
            />
            <label htmlFor="floatingInput">História</label>
          </div>
        </div>

        <div className="list-group-item">
          <div className="input-group">
            {/* <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.rankin_score}
                placeholder=""
                 readOnly
              />
              <label htmlFor="floatingInput">Pontuação Rankin</label>
            </div> */}

            <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.rankin_description}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">Rankin</label>
            </div>

            <div className="form-floating justify-content-center align-items-center">
              <span className="fs-1 p-2">{chart.rankin_score}</span>
            </div>
          </div>
        </div>

        <div className="list-group-item">
          <div className="input-group">
            <div className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={chart.other_medicines}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput">Medicamentos</label>
            </div>
          </div>
        </div>

        <div className="list-group-item">
          <span className="fs-3 p-2">Contraindicacoes Absolutas</span>
          {chart.absolute_contraindications.map((itm, i) => (
            <div key={i} className="form-floating">
              <input
                type="text"
                className="form-control no-border"
                id="floatingInput"
                value={itm.response}
                placeholder=""
                readOnly
              />
              <label htmlFor="floatingInput ">
                {itm.absolute_contraindication_template.description}
              </label>
            </div>
          ))}
        </div>

        <div className="list-group-item">
          <span className="fs-3 p-2">Anticoagulantes</span>
          <div className="flex flex-column">
            {chart.anticoagulants.map((itm, i) => (
              <div key={i} className="flex flex-row">
                <div className="flex flex-column mb-3 ms-2">
                  <div className="mb-1 fst-italic">
                    <span
                      className={
                        ["sim", "não sei"].includes(itm.response.toLowerCase())
                          ? "bg-warning"
                          : ""
                      }
                    >
                      {itm.anticoagulant_template.name}
                    </span>
                  </div>
                  <div>
                    <span
                      className={
                        itm.anticoagulant_template.is_free_text
                          ? "bg-warning"
                          : ""
                      }
                    >
                      {itm.response}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="list-group-item">
          <span className="fs-3 p-2">Comorbidades</span>
          <div className="flex flex-column">
            {chart.comorbidities.map((itm, i) => (
              <div key={i} className="flex flex-row">
                <span>
                  {itm.comorbity_template.is_free_text
                    ? itm.response_text
                    : itm.comorbity_template.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
