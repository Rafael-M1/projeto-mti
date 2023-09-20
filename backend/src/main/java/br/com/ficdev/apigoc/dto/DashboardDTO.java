package br.com.ficdev.apigoc.dto;

public class DashboardDTO {
	private Long qtdOcorrenciasPorPeriodo;
	private Long qtdOcorrenciasMulheresPorPeriodo;
	private Long qtdOcorrenciasHomensPorPeriodo;

	public DashboardDTO() {
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

}
