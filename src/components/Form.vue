<script setup>
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import InputMask from 'primevue/inputmask';

import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, numeric } from '@vuelidate/validators';
import { cyrillic } from '@/validators/cyrillic';
import { cyrillicNumber } from '@/validators/cyrillic';
import { adress } from '@/validators/adress';
import { phone } from '@/validators/phone';

const state = reactive({
  surname: '',
  name: '',
  organization: '',
  theme: '',
  message: '',
  email: '',
  country: '',
  city: '',
  zip: null,
  address: '',
  phone: '',
});
const rules = {
  surname: { required, cyrillic },
  name: { required, cyrillic },
  organization: { cyrillic },
  theme: { cyrillic },
  message: { required, cyrillicNumber },
  email: { required, email },
  country: { cyrillic },
  city: { cyrillic },
  zip: { required, numeric },
  address: { adress },
  phone: { required, phone },
};

const v$ = useVuelidate(rules, state);

const submit = () => {
  v$.value.$touch();

  if (v$.value.$error) return;

  alert('Форму успішно відправлено');
};
</script>

<template>
  <div class="wrapper">
    <form novalidate @submit.prevent="submit">
      <div class="column">
        <h2>ПРЕДСТАВТЕСЯ, БУДЬ ЛАСКА</h2>
        <div class="left">
          <label>
            * Прізвище
            <InputText name="surname" v-model="state.surname" :invalid="v$.surname.$error" />
          </label>

          <label>
            * Імʼя
            <InputText name="name" v-model="state.name" :invalid="v$.name.$error" />
          </label>

          <label>
            Організація та посада
            <InputText
              name="organization"
              v-model="state.organization"
              :invalid="v$.organization.$error"
            />
          </label>

          <div class="radio">
            <RadioButton
              class="radiobutton"
              v-model="state.position"
              inputId="position1"
              name="position"
              value="consumer"
            />
            <label for="position1">Споживач</label>
          </div>
          <div class="radio">
            <RadioButton
              class="radiobutton"
              v-model="state.position"
              inputId="position2"
              name="position"
              value="medicalWorker"
            />
            <label for="position2">Медичний працівник</label>
          </div>
          <div class="radio">
            <RadioButton
              class="radiobutton"
              v-model="state.position"
              inputId="position3"
              name="position"
              value="Journalist"
            />
            <label for="position3">Журналіст</label>
          </div>
          <fieldset>
            <legend>ПОВІДОМЛЕННЯ</legend>

            <label>
              Тема повідомлення
              <InputText name="theme" v-model="state.theme" :invalid="v$.theme.$error" />
            </label>

            <label>
              * Повідомлення
              <Textarea v-model="state.message" rows="5" cols="20" :invalid="v$.message.$error" />
            </label>
          </fieldset>
        </div>
      </div>
      <div class="column">
        <h2>Контактна Інформація</h2>
        <div class="right">
          <label>
            * Email
            <InputText name="email" v-model="state.email" :invalid="v$.email.$error" />
          </label>

          <label>
            Країна
            <InputText name="country" v-model="state.country" :invalid="v$.country.$error" />
          </label>

          <label>
            Місто
            <InputText name="city" v-model="state.city" :invalid="v$.city.$error" />
          </label>

          <label>
            Індекс
            <InputNumber
              name="zip"
              class="zip"
              v-model="state.zip"
              :useGrouping="false"
              :invalid="v$.zip.$error"
              fluid
            />
          </label>

          <label>
            Адреса
            <InputText name="address" v-model="state.address" :invalid="v$.address.$error" />
          </label>

          <label>
            * Телефон
            <InputMask
              v-model="state.phone"
              mask="(999) 999-9999"
              placeholder="(068) 999-9999"
              fluid
              :invalid="v$.phone.$error"
            />
          </label>

          <button type="submit">Відправити</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
.wrapper {
  margin-block: 40px;
}
form {
  display: flex;
  font-family: Roboto;
  font-size: 12px;
  text-transform: uppercase;
  max-width: 640px;
  margin-inline: auto;
  justify-content: space-between;
}
.column {
  display: flex;
  flex-direction: column;
  max-width: 260px;
  gap: 1em;
  width: 100%;
}
.left {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
label {
  display: flex;
  flex-direction: column;
}
label input[aria-invalid='true'],
textarea[aria-invalid='true'] {
  border: 1px solid red;
}
.radio {
  align-items: center;
  display: flex;
  margin-block: 8px;
  gap: 1em;
}
.radiobutton {
  display: flex;
}
fieldset {
  border: none;
  display: flex;
  padding: 0;
  flex-direction: column;
  gap: 1em;
}
fieldset input,
textarea {
  max-width: 260px;
  resize: none;
}
legend,
h2 {
  padding: 0;
  margin-block: 16px;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -1px;
}
input {
  height: 30px;
}
.zip ::v-deep input {
  width: 100%;
  height: 30px;
}
button {
  background-color: #464646;
  border: 1px solid #000000;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  padding: 8px 0px;
  margin-top: 50px;
  font-size: 18px;
}

@media (width <= 768px) {
  form {
    align-items: center;
    flex-direction: column;
  }
  .left,
  .right {
    gap: 6px;
  }
  input,
  .zip ::v-deep input {
    height: 24px;
  }
  .radio {
    margin-block: 4px;
  }
  button {
    margin-top: 24px;
  }
}
</style>
