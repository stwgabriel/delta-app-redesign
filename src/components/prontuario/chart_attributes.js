import { calculateAge, formatDateDifference, getMaxNIHCount, getValueFromObj } from "@/utils/funcs";
import FormDisplay from "./display";
import { contraindication_template, comorbidities_template, medicines_anticoagulant_template } from "@/utils/templates";
import React, { useEffect, useState } from "react";
import { useAPIContext } from "@/contexts/api";
import Spinner from "../spinner";
import ConductComponent from "./conduct";

export default function ChartAttributes({ chart, refreshChart }) {
  const [nihTemplate, setNihTemplate] = useState(null);
  const [attentionPoints, setAttentionPoints] = useState([]);

  const [isTypeAvc, setIsTypeAvc] = useState(true);

  useEffect(() => {
    setIsTypeAvc(() => {
      const isavc = chart.type.value === "AVC";
      console.log("isTypeAvc=", isavc);
      return isavc;
    });
  }, [chart]);

  console.log(isTypeAvc);

  useEffect(() => {
    get_nih_template().then(setNihTemplate).catch(console.error);
  }, []);

  const { get_nih_template, isLoggedConsultor } = useAPIContext();

  function getNIHScore() {
    let score = 0;
    if (nihTemplate === null) return 0;
    for (const section of nihTemplate) {
      const answer = chart[section.field];
      if (!answer) continue;
      score += answer.value.score;
    }
    return score;
  }

  function getNIHAnswerCount() {
    if (!nihTemplate) return 0;
    let count = 0;
    for (const section of nihTemplate) {
      const answer = chart[section.field];
      if (answer) {
        count += 1;
      }
    }
    return count;
  }

  useEffect(() => {
    const newAttentionPoints = [];
    contraindication_template.forEach(({ text, field }) => {
      if (getValueFromObj(chart[field]) !== "NÃO") {
        newAttentionPoints.push({
          name: text,
          response: getValueFromObj(chart[field]),
        });
      }
    });

    if (chart.last_seen_well_at?.value) {
      const lstime = new Date(chart.last_seen_well_at.value).getTime();
      if (new Date() - lstime >= (4 * 60 + 30) * 60 * 1000) {
        newAttentionPoints.push({
          name: "Última vez visto bem",
          response: `${getValueFromObj(chart.last_seen_well_at)}`,
          response_second_line: `Há ${formatDateDifference(chart.last_seen_well_at.value, new Date())}`,
        });
      }
    }

    if (chart.ictus?.value) {
      const lstime = new Date(chart.ictus.value).getTime();
      if (new Date() - lstime >= (4 * 60 + 30) * 60 * 1000) {
        newAttentionPoints.push({
          name: "ICTUS",
          response: `${getValueFromObj(chart.ictus)}`,
          response_second_line: `Há ${formatDateDifference(chart.ictus.value, new Date())}`,
        });
      }
    }

    if (chart.rankin_score?.value) {
      if (chart.rankin_score?.value >= 4) {
        newAttentionPoints.push({
          name: "Rankin",
          response: getValueFromObj(chart.rankin_score),
          response_second_line: getValueFromObj(chart.rankin_description),
        });
      }
    }

    if (chart.blood_pressure_systolic?.value >= 220 || chart.blood_pressure_diastolic?.value >= 120) {
      newAttentionPoints.push({
        name: "Pressão arterial elevada",
        response: `${getValueFromObj(chart.blood_pressure_systolic)} / ${getValueFromObj(
          chart.blood_pressure_diastolic
        )}`,
      });
    }

    setAttentionPoints(newAttentionPoints);
  }, [chart]);

  return (
    <React.Fragment>
      <section className="d-flex flex list-group">
        {isLoggedConsultor && attentionPoints && (
          <div className="d-flex flex-column list-group-item">
            <span className="text-danger fs-3 mb-2">Pontos de atenção</span>
            <table className="table table-danger">
              <tbody>
                {attentionPoints.map(({ name, response, response_second_line }, i) => (
                  <tr key={`ac-${i}`} className=" text-danger">
                    <td className="px-3 align-middle">{name}</td>
                    <td className="px-3 text-center d-flex flex-column">
                      <span>{response}</span>
                      {response_second_line && <span className="mt-2">{response_second_line}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="d-flex list-group-item">
          <div className="d-flex input-group justify-content-around">
            <FormDisplay name="Name" text={getValueFromObj(chart.name)} />
            <FormDisplay name="CPF" text={getValueFromObj(chart.cpf)} />
            {isTypeAvc && <FormDisplay name="Peso" text={getValueFromObj(chart.weight)} />}
            <FormDisplay name="Data de nascimento" text={getValueFromObj(chart.birth_date)} />
            <FormDisplay
              name="Idade"
              text={chart.birth_date === null ? chart.age?.value || "" : calculateAge(chart.birth_date.value)}
            />
          </div>
        </div>

        {isTypeAvc && (
          <div className="d-flex list-group-item">
            <div className="d-flex input-group justify-content-around">
              <FormDisplay name="Tempo de evento conhecido?" text={getValueFromObj(chart.known_event_time)} />
              <FormDisplay name="ICTUS" text={getValueFromObj(chart.ictus)} />
              <FormDisplay name="Última vez visto bem" text={getValueFromObj(chart.last_seen_well_at)} />
            </div>
          </div>
        )}

        <div className="d-flex flex-column list-group-item">
          {isTypeAvc && (
            <FormDisplay
              name="Motivo"
              text={getValueFromObj(chart.open_reason)}
              align_label_center={false}
              align_value_center={false}
            />
          )}
          <FormDisplay
            name="História coletada com"
            text={getValueFromObj(chart.history_collected_with)}
            align_label_center={false}
            align_value_center={false}
          />
          <FormDisplay
            name="História"
            text={getValueFromObj(chart.history)}
            align_label_center={false}
            align_value_center={false}
          />
        </div>

        {isTypeAvc && (
          <>
            <div className="d-flex list-group-item">
              <div className="d-flex input-group justify-content-around">
                <FormDisplay name="Rankin Score" text={getValueFromObj(chart.rankin_score)} />
                <FormDisplay name="Rankin" text={getValueFromObj(chart.rankin_description)} />
              </div>
            </div>

            <div className="d-flex flex-column list-group-item">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="px-3" scope="col">
                      Anticoagulante
                    </th>
                    <th className="px-3 text-center" scope="col">
                      Tomado?
                    </th>
                    <th className="px-3 text-center" scope="col">
                      Horário
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {medicines_anticoagulant_template.map((template, i) => (
                    <tr key={`aco-${i}`}>
                      <td className="px-3">{template.text}</td>
                      <td className="px-3 text-center">{getValueFromObj(chart[template.field])}</td>
                      <td className="px-3 text-center">{getValueFromObj(chart[template.field_taken_at])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <FormDisplay
                name="Outros Medicamentos"
                text={getValueFromObj(chart.other_medicines)}
                align_label_center={false}
                align_value_center={false}
              />
            </div>

            <div className="d-flex flex-column list-group-item">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="px-3" scope="col">
                      Contraindicações
                    </th>
                    <th className="px-3 text-center" scope="col">
                      Resposta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contraindication_template.map((template, i) => (
                    <tr key={`ac-${i}`}>
                      <td className="px-3">{template.text}</td>
                      <td className="px-3 text-center">
                        {getValueFromObj(chart[template.field])}
                        <div className="d-flex">
                          {template.case_yes &&
                            template.case_yes.map((subtemplate, j) => (
                              <div key={`ac-sub-${j}`} className="d-flex flex-column px-1">
                                <span className="d-flex">{subtemplate.text}</span>
                                <span className="d-flex">{getValueFromObj(chart[subtemplate.field])}</span>
                                <span className="d-flex">
                                  {subtemplate.field_other ? getValueFromObj(chart[subtemplate.field_other]) : ""}
                                </span>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column list-group-item">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="px-3" scope="col">
                      Comorbidades
                    </th>
                    <th className="px-3 text-center" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {comorbidities_template.map((template, i) => (
                    <tr key={`cmo-${i}`}>
                      <td className="px-3">{template.text}</td>
                      <td className="px-3 text-center">{getValueFromObj(chart[template.field])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column list-group-item">
              {!nihTemplate ? (
                <Spinner />
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="px-3" scope="col">
                        Item NIHSS
                      </th>
                      <th className="px-3 text-center" scope="col">
                        Resposta
                      </th>
                      <th className="px-3 text-center" scope="col">
                        Explicação
                      </th>
                      <th className="px-3 text-center" scope="col">
                        Pontuação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {nihTemplate.map((template, i) => (
                      <tr key={`nih-${i}`}>
                        <td className="px-3">{template.description}</td>
                        <td className="px-3">
                          {chart[template.field] ? chart[template.field]?.value.description : ""}
                        </td>
                        <td className="px-3">{chart[template.field] ? chart[`${template.field}_other`]?.value : ""}</td>
                        <td className="px-3">{chart[template.field] ? chart[template.field]?.value.score : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="d-flex flex-column align-items-center">
                <span className="d-flex py-1">
                  Pontuação NIHSS: {getNIHScore()} de {getMaxNIHCount(nihTemplate)}
                </span>
                <span className="d-flex py-1">
                  Respondidas {getNIHAnswerCount()} de {nihTemplate?.length} (
                  {Math.round((100 * getNIHAnswerCount()) / nihTemplate?.length)}
                  %)
                </span>
              </div>
            </div>
          </>
        )}

        <div className="d-flex list-group-item">
          <FormDisplay
            name="Conduta"
            text={getValueFromObj(chart.conduct)}
            align_label_center={false}
            align_value_center={false}
          />
        </div>
      </section>

      {isLoggedConsultor && <ConductComponent chart={chart} refreshChart={refreshChart} />}
    </React.Fragment>
  );
}
