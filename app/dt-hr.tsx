import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";

export default function DataHora() {
  const router = useRouter();

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  const horarios = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  function continuar() {
    if (!dataSelecionada || !horarioSelecionado) {
      alert("Selecione uma data e um horário.");
      return;
    }

    router.push({
      pathname: "/confirmacao",
      params: {
        data: dataSelecionada,
        horario: horarioSelecionado,
      },
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Data & Hora</Text>

      <Text style={styles.subtitulo}>Quando você prefere?</Text>

      <Calendar
        onDayPress={(day) => {
          setDataSelecionada(day.dateString);
        }}
        markedDates={{
          [dataSelecionada]: {
            selected: true,
            selectedColor: "#7B84A6",
          },
        }}
        theme={{
          todayTextColor: "#7B84A6",
          arrowColor: "#7B84A6",
          selectedDayBackgroundColor: "#7B84A6",
        }}
      />

      <Text style={styles.horarioTitulo}>Horários disponíveis</Text>

      <View style={styles.gradeHorarios}>
        {horarios.map((horario) => (
          <TouchableOpacity
            key={horario}
            style={[
              styles.botaoHorario,
              horarioSelecionado === horario &&
                styles.botaoHorarioSelecionado,
            ]}
            onPress={() => setHorarioSelecionado(horario)}
          >
            <Text
              style={[
                styles.textoHorario,
                horarioSelecionado === horario &&
                  styles.textoHorarioSelecionado,
              ]}
            >
              {horario}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.botaoProximo} onPress={continuar}>
        <Text style={styles.textoProximo}>Próximo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EDF8",
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    color: "#27304D",
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#27304D",
  },

  horarioTitulo: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#27304D",
  },

  gradeHorarios: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  botaoHorario: {
    width: "30%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  botaoHorarioSelecionado: {
    backgroundColor: "#7B84A6",
  },

  textoHorario: {
    color: "#27304D",
    fontWeight: "500",
  },

  textoHorarioSelecionado: {
    color: "#FFFFFF",
  },

  botaoProximo: {
    marginTop: 25,
    marginBottom: 40,
    backgroundColor: "#7B84A6",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  textoProximo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});