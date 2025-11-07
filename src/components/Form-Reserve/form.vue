<template>
  <div class="pa-4 text-center">
    <v-card title="Formulario para Reserva">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
            :rules="[required]"
              label="Nome"
              variant="outlined"
              v-model="Name"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              :rules="[validEmail, required]"
              type="email"
              label="Email"
              v-model="Email"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
            :rules="[validCpf, min11, required]"
              label="CPF"
              variant="outlined"
              v-model="Cpf"
              v-mask="['###.###.###-##']"
              type="text"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
            :rules="[min15, required]"
              label="Telefone"
              v-model="Phone"
              v-mask="['(##)#####-####']"
              type="text"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
            :rules="[required]"
              label="Data da Reserva"
              v-model="FormattedDate"
              type="datetime-local"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-select
            :rules="[required]"
              variant="outlined"
              :items="['Mezanino', 'Varanda']"
              label="Ambiente"
              v-model="Ambiente"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="plain" class="text-capitalize" @click="closeForm">
          Cancelar</v-btn
        >
        <v-btn
          color="primary"
          class="text-capitalize"
          variant="tonal"
          @click="submitForm"
          >Reservar</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import Swal from "sweetalert2"
import { ref } from "vue";
import axios from "axios";
import { format }  from "date-fns"

const emit = defineEmits(["initReserve"]);
const Name = ref("");
const Email = ref("");
const Cpf = ref("");
const Phone = ref("");
const FormattedDate = ref("");
const Ambiente = ref("");

const closeForm = () => {
  emit("initReserve", false);
};

const submitForm = async():Promise<void> => {
  const cpfFormat = Cpf.value.replaceAll(/[.-]/g, "");
  const numberFormat = Phone.value.replaceAll(/[()-]/g, "");
  const dateTimeFormat = format(new Date(FormattedDate.value), "dd/MM/yyyy 'as' p")
  const payload = {
    Name: Name.value,
    Email: Email.value,
    Cpf: cpfFormat,
    Phone: numberFormat,
    FormattedDate: dateTimeFormat,
    Ambiente: Ambiente.value.toLocaleLowerCase(),
  };
  console.log(payload)
  try {
    await axios.post(`http://localhost:8080/clientes`, payload)
    Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});
} catch (error) {
  emit("initReserve", false);
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Não foi possivel concluir a reserva",
});

  }
};

const validEmail = (email: string): string | boolean => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  }
  return "Email inválido.";
};

const min11 = (value: string): string | boolean => {
  if (value.length === 14) {
    return true;
  }
  return "O CPF deve ter apenas 11 dígitos.";
};

const min15 = (value: string): string | boolean => {
  if (value.length === 14) {
    return true;
  }
  return "O telefone deve conter apenas 11 números.";
};

const required = (value: string): string | boolean => {
  if (value) {
    return true;
  }
  return "Este campo é necessario.";
};

const validCpf = (value: string): string | boolean => {
  if (typeof value !== "string") {
    return false;
  }
  if (
    !value.replace(/[\s.-]*/gim, "") ||
    value.replace(/[\s.-]*/gim, "").length !== 11 ||
    value.replace(/[\s.-]*/gim, "") === "00000000000" ||
    value.replace(/[\s.-]*/gim, "") === "11111111111" ||
    value.replace(/[\s.-]*/gim, "") === "22222222222" ||
    value.replace(/[\s.-]*/gim, "") === "33333333333" ||
    value.replace(/[\s.-]*/gim, "") === "44444444444" ||
    value.replace(/[\s.-]*/gim, "") === "55555555555" ||
    value.replace(/[\s.-]*/gim, "") === "66666666666" ||
    value.replace(/[\s.-]*/gim, "") === "77777777777" ||
    value.replace(/[\s.-]*/gim, "") === "88888888888" ||
    value.replace(/[\s.-]*/gim, "") === "99999999999"
  ) {
    return "Este CPF não é válido.";
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma =
      soma +
      parseInt(value.replace(/[\s.-]*/gim, "").substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(value.replace(/[\s.-]*/gim, "").substring(9, 10))) {
    return "Este CPF não é válido";
  }
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma =
      soma +
      parseInt(value.replace(/[\s.-]*/gim, "").substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(value.replace(/[\s.-]*/gim, "").substring(10, 11))) {
    return "Este CPF não é válido";
  }
  value.replaceAll(/[.-]/g, "");
  return true;
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
