package br.com.ficdev.apigoc.dto;

public class ValidarOcorrenciaDTO {
	private Long idOcorrencia;
	private Long idOperador;

	public ValidarOcorrenciaDTO() {
	}

	public Long getIdOcorrencia() {
		return idOcorrencia;
	}

	public void setIdOcorrencia(Long idOcorrencia) {
		this.idOcorrencia = idOcorrencia;
	}

	public Long getIdOperador() {
		return idOperador;
	}

	public void setIdOperador(Long idOperador) {
		this.idOperador = idOperador;
	}
}
