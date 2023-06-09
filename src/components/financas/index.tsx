import React, { useContext, useState } from "react";
import { Button, SegmentedControl } from "@mantine/core";
import { IconLayoutGrid, IconList, IconPlus } from "@tabler/icons-react";

import AutenticacaoContext from "@/data/contexts/AutenticacaoContext";
import useTransacao, { TipoExibicao } from "@/data/hooks/useTransacao";
import servicos from "@/logic/core";
import Id from "@/logic/core/comum/Id";
import Transacao, { transacaoVazia } from "@/logic/core/financas/Transacao";
import transacoesFalsas from "@/data/constants/transacoesFalsas";

import Cabecalho from "../template/Cabecalho";
import CampoMesAno from "../template/CampoMesAno";
import Conteudo from "../template/Conteudo";
import NaoEncontrado from "../template/NaoEncontrado";
import Pagina from "../template/Pagina";
import Formulario from "./Formulario";
import Grade from "./Grade";
import Lista from "./Lista";
import Sumario from "./Sumario";

export default function Financas() {
  const {
    data,
    alterarData,
    alterarExibicao,
    tipoExibicao,
    transacoes,
    transacao,
    selecionar,
    salvar,
    excluir,
  } = useTransacao();

  function renderizarControles() {
    return (
      <div className="flex justify-between">
        <CampoMesAno data={data} dataMudou={alterarData} />
        <div className="flex gap-5">
          <Button
            className="bg-cyan-900"
            leftIcon={<IconPlus />}
            onClick={() => selecionar(transacaoVazia)}
          >
            Nova transação
          </Button>
          <Button
            onClick={() => {
              window.open("hhttps://chipper-cajeta-b0d0e2.netlify.app/");
            }}
          >
            Calculadora
          </Button>
          <SegmentedControl
            data={[
              { label: <IconList />, value: "lista" },
              { label: <IconLayoutGrid />, value: "grade" },
            ]}
            onChange={(tipo) => alterarExibicao(tipo as TipoExibicao)}
          />
        </div>
      </div>
    );
  }

  function renderizarTransacoes() {
    const props = { transacoes, selecionarTransacao: selecionar };
    return tipoExibicao === "lista" ? <Lista {...props} /> : <Grade {...props} />;
  }

  return (
    <Pagina>
      <Cabecalho />
      <Conteudo className="gap-5">
        <Sumario transacoes={transacoes} />
        {renderizarControles()}
        {transacao ? (
          <Formulario
            transacao={transacao}
            salvar={salvar}
            excluir={excluir}
            cancelar={() => selecionar(null)}
          />
        ) : transacoes.length ? (
          renderizarTransacoes()
        ) : (
          <NaoEncontrado>Nenhuma transação encontrada</NaoEncontrado>
        )}
      </Conteudo>
    </Pagina>
  );
}
