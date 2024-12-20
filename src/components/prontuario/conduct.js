import React, { useEffect, useState } from "react";

export default function ConductComponent({ chart }) {
  const [conduct, setConduct] = useState("");

  const weight = chart?.weight?.value ? chart.weight.value : null;

  const condutas_template = [
    {
      title: "Condutas possíveis",
      condutas: [
        `Trombólise química com Alteplase 1mg/ml: Realizar [0,09x peso estimado do paciente]mg ${
          weight && ` = 0,09 x ${weight} = ${(weight * 0.09).toFixed(2)}mg`
        } EV em 01 minuto, em seguida instalar bomba de infusão [0,81x peso estimado do paciente]mg ${
          weight && ` = 0,81 x ${weight} = ${(weight * 0.81).toFixed(2)}mg`
        } para ser infundido em 01 hora.`,
        `Contraindicada trombólise química com Alteplase, pois os riscos para o paciente superam os potenciais benefícios.`,
        `Reduzir Pressão Arterial do paciente até 185x110 e entrar em contato novamente para que seja autorizada a trombólise química, se paciente ainda em tempo hábil para tal.`,
        `Entrar em contato imediatamente após resultado de INR (se INR <1,7) para que seja autorizada a trombólise química, se paciente ainda em tempo hábil para tal.`,
      ],
    },
    {
      title: "Condutas Seguintes",
      condutas: [
        "Encaminhar paciente para realização de trombectomia mecânica devido sinais de oclusão arterial aguda proximal observada em Angiotomografia Arterial de crânio e pescoço.",
        "Entrar em contato imediato com a equipe da Neurocirurgia para avaliar possibilidade de abordagem cirúrgica.",
        "Internação hospitalar com prescrição de Ácido acetilsalicílico 100mg e atorvastatina 80mg.",
        "Internação hospitalar com prescrição de Ácido acetilsalicílico 100mg, clopidogrel 75mg e atorvastatina 80mg",
        "Internação hospitalar com prescrição de Anticoagulação plena e Atorvastatina 80mg",
        "Paciente com baixa probabilidade de Injúria Neurovascular Aguda e baixo risco cardiovascular (NIHSS: 0 / ABCD2 <= 3). Considerar alta com orientações, acompanhamento ambulatorial e retorno ao serviço de urgência se sintomático.",
      ],
    },
  ];

  return (
    <section className="flex list-group my-3">
      <div className="list-group-item">
        <span className="fs-3">Conduta(s)</span>
        <textarea
          className="form-control mt-4"
          value={conduct}
          rows={4}
          onChange={(e) => setConduct(e.target.value)}
        />
        {condutas_template.map((ctx, i) => (
          <React.Fragment key={`cdt-${i}`}>
            <span className="mt-4 fs-5">{ctx.title}</span>
            <div className="flex-column">
              {ctx.condutas.map((txt, j) => (
                <span
                  key={`cdt-${i}-${j}`}
                  className="my-2 border p-2 rounded pointer"
                  onClick={() => setConduct((old) => old + "\n" + txt)}
                >
                  {txt}
                </span>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
