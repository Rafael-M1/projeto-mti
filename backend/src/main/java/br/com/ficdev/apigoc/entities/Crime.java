package br.com.ficdev.apigoc.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_crime")
public class Crime implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_crime")
	private Long idCrime;
	// Nome do crime, ex: Roubo
	private String descricao;
	private boolean status;

	public Crime() {
	}

	public Crime(Long idCrime, String descricao, boolean status) {
		this.idCrime = idCrime;
		this.descricao = descricao;
		this.status = status;
	}

	public Long getIdCrime() {
		return idCrime;
	}

	public void setIdCrime(Long idCrime) {
		this.idCrime = idCrime;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Crime [idCrime=" + idCrime + ", descricao=" + descricao + ", status=" + status + "]";
	}
}
