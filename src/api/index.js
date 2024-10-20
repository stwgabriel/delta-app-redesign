class APIHandler {
  endpoint = "http://localhost:8000";
  constructor() {}

  async get_rankin_template() {
    const response = await fetch(`${this.endpoint}/templates/rankin`);
    const response_obj = await response.json();
    return response_obj;
  }

  async get_absolute_contraindication_template() {
    const response = await fetch(
      `${this.endpoint}/templates/absolute_contraindication`
    );
    const response_obj = await response.json();
    // console.log(response_obj);
    return response_obj;
  }

  async get_comorbity_template() {
    const response = await fetch(`${this.endpoint}/templates/comorbity`);
    const response_obj = await response.json();
    return response_obj;
  }

  async get_anticoagulants_template() {
    const response = await fetch(`${this.endpoint}/templates/anticoagulants`);
    const response_obj = await response.json();
    return response_obj;
  }
}

export default APIHandler;
