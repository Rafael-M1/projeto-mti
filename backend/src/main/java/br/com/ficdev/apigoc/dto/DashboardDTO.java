package br.com.ficdev.apigoc.dto;

import java.util.List;

public class DashboardDTO {
	private Long qtdOcorrenciasTotais;
	private Long qtdOcorrenciasPorPeriodo;
	private Long qtdOcorrenciasMulheresPorPeriodo;
	private Long qtdOcorrenciasHomensPorPeriodo;
	private List<MapDTO> qtdOcorrenciasPorTipoCrimePorPeriodo;

	public DashboardDTO() {
	}

	public Long getQtdOcorrenciasTotais() {
		return qtdOcorrenciasTotais;
	}

	public void setQtdOcorrenciasTotais(Long qtdOcorrenciasTotais) {
		this.qtdOcorrenciasTotais = qtdOcorrenciasTotais;
	}

	public Long getQtdOcorrenciasPorPeriodo() {
		return qtdOcorrenciasPorPeriodo;
	}

	public void setQtdOcorrenciasPorPeriodo(Long qtdOcorrenciasPorPeriodo) {
		this.qtdOcorrenciasPorPeriodo = qtdOcorrenciasPorPeriodo;
	}

	public Long getQtdOcorrenciasMulheresPorPeriodo() {
		return qtdOcorrenciasMulheresPorPeriodo;
	}

	public void setQtdOcorrenciasMulheresPorPeriodo(Long qtdOcorrenciasMulheresPorPeriodo) {
		this.qtdOcorrenciasMulheresPorPeriodo = qtdOcorrenciasMulheresPorPeriodo;
	}

	public Long getQtdOcorrenciasHomensPorPeriodo() {
		return qtdOcorrenciasHomensPorPeriodo;
	}

	public void setQtdOcorrenciasHomensPorPeriodo(Long qtdOcorrenciasHomensPorPeriodo) {
		this.qtdOcorrenciasHomensPorPeriodo = qtdOcorrenciasHomensPorPeriodo;
	}

	public List<MapDTO> getQtdOcorrenciasPorTipoCrimePorPeriodo() {
		return qtdOcorrenciasPorTipoCrimePorPeriodo;
	}

	public void setQtdOcorrenciasPorTipoCrimePorPeriodo(List<MapDTO> qtdOcorrenciasPorTipoCrimePorPeriodo) {
		this.qtdOcorrenciasPorTipoCrimePorPeriodo = qtdOcorrenciasPorTipoCrimePorPeriodo;
	}

}
