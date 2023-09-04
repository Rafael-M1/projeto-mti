package br.com.ficdev.apigoc.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import br.com.ficdev.apigoc.entities.compositekeys.OcorrenciaCrimeId;

@Entity
@Table(name = "tb_ocorrencia_crime")
public class OcorrenciaCrime implements Serializable {
	private static final long serialVersionUID = 1L;
	@EmbeddedId
	private OcorrenciaCrimeId idOcorrenciaCrime;
	@ManyToOne
	@MapsId("idOcorrencia")
	@JoinColumn(name = "id_ocorrencia")
	private Ocorrencia ocorrencia;
	@ManyToOne
	@MapsId("idCrime")
	@JoinColumn(name = "id_crime")
	private Crime crime;
	@Column(name = "descricao_crime_ocorrencia")
	private String descricaoCrimeOcorrencia;

	public OcorrenciaCrimeId getIdOcorrenciaCrime() {
		return idOcorrenciaCrime;
	}

	public void setIdOcorrenciaCrime(OcorrenciaCrimeId idOcorrenciaCrime) {
		this.idOcorrenciaCrime = idOcorrenciaCrime;
	}

	public Ocorrencia getOcorrencia() {
		return ocorrencia;
	}

	public void setOcorrencia(Ocorrencia ocorrencia) {
		this.ocorrencia = ocorrencia;
	}

	public Crime getCrime() {
		return crime;
	}

	public void setCrime(Crime crime) {
		this.crime = crime;
	}

	public String getDescricaoCrimeOcorrencia() {
		return descricaoCrimeOcorrencia;
	}

	public void setDescricaoCrimeOcorrencia(String descricaoCrimeOcorrencia) {
		this.descricaoCrimeOcorrencia = descricaoCrimeOcorrencia;
	}
}
