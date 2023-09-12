package br.com.ficdev.apigoc.entities.compositekeys;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class OcorrenciaCrimeId implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "id_ocorrencia")
	private Long idOcorrencia;
	@Column(name = "id_crime")
	private Long idCrime;
	
	public OcorrenciaCrimeId() {
	}
	
	public OcorrenciaCrimeId(Long idOcorrencia, Long idCrime) {
		this.idOcorrencia = idOcorrencia;
		this.idCrime = idCrime;
	}

	public Long getIdOcorrencia() {
		return idOcorrencia;
	}

	public void setIdOcorrencia(Long idOcorrencia) {
		this.idOcorrencia = idOcorrencia;
	}

	public Long getIdCrime() {
		return idCrime;
	}

	public void setIdCrime(Long idCrime) {
		this.idCrime = idCrime;
	}
}
