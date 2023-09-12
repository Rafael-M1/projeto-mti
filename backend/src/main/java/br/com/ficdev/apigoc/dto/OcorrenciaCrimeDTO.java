package br.com.ficdev.apigoc.dto;

import java.io.Serializable;

import br.com.ficdev.apigoc.entities.OcorrenciaCrime;

public class OcorrenciaCrimeDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String crime;
	private String descricaoCrimeOcorrencia;
	
	public OcorrenciaCrimeDTO() {
	}

	public OcorrenciaCrimeDTO(OcorrenciaCrime ocorrenciaCrime) {
		this.crime = ocorrenciaCrime.getCrime().getDescricao();
		this.descricaoCrimeOcorrencia = ocorrenciaCrime.getDescricaoCrimeOcorrencia();
	}

	public String getCrime() {
		return crime;
	}

	public String getDescricaoCrimeOcorrencia() {
		return descricaoCrimeOcorrencia;
	}
}
