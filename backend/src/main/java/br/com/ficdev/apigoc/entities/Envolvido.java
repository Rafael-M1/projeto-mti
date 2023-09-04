package br.com.ficdev.apigoc.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_envolvido")
public class Envolvido implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_envolvido")
	private Long idEnvolvido;
	// Descricao fisica do acusado/envolvido
	private String descricao;
	@ManyToOne
	@JoinColumn(name = "id_pessoa")
	private Pessoa pessoa;
	@ManyToOne
	@JoinColumn(name = "id_ocorrencia")
	private Ocorrencia ocorrencia;

	public Envolvido() {
	}

	public Long getIdEnvolvido() {
		return idEnvolvido;
	}

	public void setIdEnvolvido(Long idEnvolvido) {
		this.idEnvolvido = idEnvolvido;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Ocorrencia getOcorrencia() {
		return ocorrencia;
	}

	public void setOcorrencia(Ocorrencia ocorrencia) {
		this.ocorrencia = ocorrencia;
	}

	@Override
	public String toString() {
		return "Acusado [idEnvolvido=" + idEnvolvido + ", descricao=" + descricao + ", pessoa=" + pessoa
				+ ", ocorrencia=" + ocorrencia + "]";
	}
}
