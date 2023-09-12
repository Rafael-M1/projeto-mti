package br.com.ficdev.apigoc.dto;

import java.io.Serializable;

import br.com.ficdev.apigoc.entities.OcorrenciaCrime;

public class OcorrenciaCrimeDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idCrime;
	private String tipoCrime;
	private String descricaoCrimeOcorrencia;
	
	public OcorrenciaCrimeDTO() {
	}

	public OcorrenciaCrimeDTO(OcorrenciaCrime ocorrenciaCrime) {
		this.idCrime = ocorrenciaCrime.getCrime().getIdCrime();
		this.tipoCrime = ocorrenciaCrime.getCrime().getDescricao();
		this.descricaoCrimeOcorrencia = ocorrenciaCrime.getDescricaoCrimeOcorrencia();
	}

	public Long getIdCrime() {
		return idCrime;
	}

	public String getTipoCrime() {
		return tipoCrime;
	}

	public String getDescricaoCrimeOcorrencia() {
		return descricaoCrimeOcorrencia;
	}

	@Override
	public String toString() {
		return "OcorrenciaCrimeDTO [idCrime=" + idCrime + ", tipoCrime=" + tipoCrime + ", descricaoCrimeOcorrencia="
				+ descricaoCrimeOcorrencia + "]";
	}
}
