package br.com.ficdev.apigoc.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_lotacao")
public class Lotacao implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_lotacao")
	private Long idLotacao;
	//Nome da Lotação, ex: Secretaria X
	private String descricao;
	//Endereco
	private String cidade;
	private String bairro;
	private String endereco;
	private String numero;
	private String complemento;
	//Endereco
	
	public Lotacao() {
	}
	
	public Lotacao(Long idLotacao, String descricao, String cidade, String bairro, String endereco, String numero,
			String complemento) {
		this.idLotacao = idLotacao;
		this.descricao = descricao;
		this.cidade = cidade;
		this.bairro = bairro;
		this.endereco = endereco;
		this.numero = numero;
		this.complemento = complemento;
	}

	public Long getIdLotacao() {
		return idLotacao;
	}

	public void setIdLotacao(Long idLotacao) {
		this.idLotacao = idLotacao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	@Override
	public String toString() {
		return "Lotacao [idLotacao=" + idLotacao + ", descricao=" + descricao + ", cidade=" + cidade + ", bairro="
				+ bairro + ", endereco=" + endereco + ", numero=" + numero + ", complemento=" + complemento + "]";
	}
}
