import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  today: "Hoje",
};

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const APIKEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

LocaleConfig.defaultLocale = "pt-br";

export default function DataHora() {
  const rota = useRouter();
  const params = useLocalSearchParams();

  const servico = (params.servico as string) || "Não informado";
  const pagamento = (params.pagamento as string) || "Não informado";
  const servicoId = params.servico_id as string;
  const valor = params.valor as string;

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [livres, setLivres] = useState<any[]>([]);

  console.log("Horários:", livres.length);

  useEffect(() => {
    async function buscarHorarios() {
      try {
        const hoje = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/horario_disponivel?data=gte.${hoje}&order=data,hora`,
          { headers: { apikey: APIKEY } },
        );
        setLivres(await response.json());
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
      }
    }
    buscarHorarios();
  }, []);

  const minutos = (hora: string) =>
    Number(hora.slice(0, 2)) * 60 + Number(hora.slice(3, 5));
  const doDia = livres.filter((h) => h.data === dataSelecionada);
  const ocupados = doDia.filter((h) => !h.disponivel);
  const horarios = doDia.map((h) => ({
    hora: h.hora.slice(0, 5),
    bloqueado:
      !h.disponivel ||
      ocupados.some((o) => Math.abs(minutos(o.hora) - minutos(h.hora)) < 90),
  }));

  function continuar() {
    if (!dataSelecionada || !horarioSelecionado) {
      Alert.alert("Aviso", "Selecione uma data e um horário.");
      return;
    }
    rota.push({
      pathname: "/confirmacao" as any,
      params: {
        data: dataSelecionada,
        horario: horarioSelecionado,
        servico: servico,
        pagamento: pagamento,
        servico_id: servicoId,
        valor: valor,
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.accentBar} />
        <Text style={styles.titulo}>Data & Hora</Text>
        <Text style={styles.subtitulo}>Quando você prefere?</Text>

        <Calendar
          minDate={new Date().toISOString().split("T")[0]}
          onDayPress={(dia) => {
            setDataSelecionada(dia.dateString);
            setHorarioSelecionado("");
          }}
          markedDates={{
            [dataSelecionada]: {
              selected: true,
              selectedColor: "#2255a4",
            },
          }}
          theme={{
            todayTextColor: "#2255a4",
            arrowColor: "#1a3a5c",
            selectedDayBackgroundColor: "#2255a4",
            backgroundColor: "#fff",
            calendarBackground: "#fff",
            textSectionTitleColor: "#1a3a5c",
            dayTextColor: "#1a2f5e",
            monthTextColor: "#1a3a5c",
            textDisabledColor: "#c0c8d8",
          }}
        />

        <Text style={styles.horarioTitulo}>Horários disponíveis</Text>

        <View style={styles.gradeHorarios}>
          {horarios.map((h) => (
            <TouchableOpacity
              key={h.hora}
              disabled={h.bloqueado}
              style={[
                styles.botaoHorario,
                horarioSelecionado === h.hora && styles.botaoHorarioSelecionado,
                h.bloqueado && styles.botaoHorarioBloqueado,
              ]}
              onPress={() => setHorarioSelecionado(h.hora)}
            >
              <Text
                style={[
                  styles.textoHorario,
                  horarioSelecionado === h.hora &&
                    styles.textoHorarioSelecionado,
                ]}
              >
                {h.hora}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.botaoProximo} onPress={continuar}>
          <Text style={styles.textoProximo}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#c8d8ee",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 4,
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 4,
  },
  topTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a3a5c",
  },
  container: {
    flex: 1,
    backgroundColor: "#c8d8ee",
    padding: 20,
  },
  accentBar: {
    width: 32,
    height: 4,
    backgroundColor: "#1a3a5c",
    borderRadius: 3,
    marginTop: 16,
    marginBottom: 8,
    opacity: 0.85,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a3a5c",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: "#1a3a5c",
    marginBottom: 15,
    opacity: 0.8,
  },
  horarioTitulo: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 15,
    fontWeight: "700",
    color: "#1a3a5c",
  },
  gradeHorarios: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  botaoHorario: {
    width: "30%",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  botaoHorarioSelecionado: {
    backgroundColor: "#2255a4",
    borderWidth: 2,
    borderColor: "#2255a4",
  },

  botaoHorarioBloqueado: {
    opacity: 0.4,
  },

  textoHorario: {
    color: "#1a2f5e",
    fontWeight: "600",
    fontSize: 13,
  },
  textoHorarioSelecionado: {
    color: "#fff",
  },
  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  botaoProximo: {
    backgroundColor: "#1a3a6b",
    padding: 18,
    borderRadius: 50,
    alignItems: "center",
  },
  textoProximo: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
