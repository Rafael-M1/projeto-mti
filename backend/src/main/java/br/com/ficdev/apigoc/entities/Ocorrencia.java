package br.com.ficdev.apigoc.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_ocorrencia")
public class Ocorrencia implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_ocorrencia")
	private Long idOcorrencia;
	// Endereco
	private String cidade;
	private String bairro;
	private String endereco;
	private String numero;
	private String complemento;

	// Campo para guardar horario quando a ocorrencia é gerada
	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE", name = "data_criado")
	private LocalDateTime dataCriado;
	@Column(name = "data_ocorrencia")
	private LocalDateTime dataOcorrencia;

	@Column(name = "descricao_geral")
	private String descricaoGeral;
	private boolean status;

	@ManyToOne
	@JoinColumn(name = "id_vitima")
	private Pessoa vitima;
	@ManyToOne
	@JoinColumn(name = "id_operador")
	private Usuario operador;
	@OneToMany(mappedBy = "ocorrencia")
	private Set<OcorrenciaCrime> listaOcorrenciaCrime = new HashSet<>();
	@OneToMany(mappedBy = "ocorrencia")
	private Set<Envolvido> listaEnvolvidos = new HashSet<>();
	
	public Ocorrencia() {
	}

	public Ocorrencia(Long idOcorrencia, String cidade, String bairro, String endereco, String numero,
			String complemento, LocalDateTime dataCriado, LocalDateTime dataOcorrencia, String descricaoGeral,
			boolean status, Pessoa vitima, Usuario operador) {
		this.idOcorrencia = idOcorrencia;
		this.cidade = cidade;
		this.bairro = bairro;
		this.endereco = endereco;
		this.numero = numero;
		this.complemento = complemento;
		this.dataCriado = dataCriado;
		this.dataOcorrencia = dataOcorrencia;
		this.descricaoGeral = descricaoGeral;
		this.status = status;
		this.vitima = vitima;
		this.operador = operador;
	}

	public Long getIdOcorrencia() {
		return idOcorrencia;
	}

	public void setIdOcorrencia(Long idOcorrencia) {
		this.idOcorrencia = idOcorrencia;
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

	public LocalDateTime getDataCriado() {
		return dataCriado;
	}

	public void setDataCriado(LocalDateTime dataCriado) {
		this.dataCriado = dataCriado;
	}

	public LocalDateTime getDataOcorrencia() {
		return dataOcorrencia;
	}

	public void setDataOcorrencia(LocalDateTime dataOcorrencia) {
		this.dataOcorrencia = dataOcorrencia;
	}

	public String getDescricaoGeral() {
		return descricaoGeral;
	}

	public void setDescricaoGeral(String descricaoGeral) {
		this.descricaoGeral = descricaoGeral;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Pessoa getVitima() {
		return vitima;
	}

	public void setVitima(Pessoa vitima) {
		this.vitima = vitima;
	}

	public Usuario getOperador() {
		return operador;
	}

	public void setOperador(Usuario operador) {
		this.operador = operador;
	}

	public Set<OcorrenciaCrime> getListaOcorrenciaCrime() {
		return listaOcorrenciaCrime;
	}
	
	public void addOcorrenciaCrime(OcorrenciaCrime ocorrenciaCrime) {
		this.listaOcorrenciaCrime.add(ocorrenciaCrime);
	}

	public Set<Envolvido> getListaEnvolvidos() {
		return listaEnvolvidos;
	}
	
	public void addEnvolvido(Envolvido envolvido) {
		this.listaEnvolvidos.add(envolvido);
	}

	@Override
	public String toString() {
		return "Ocorrencia [idOcorrencia=" + idOcorrencia + ", cidade=" + cidade + ", bairro=" + bairro + ", endereco="
				+ endereco + ", numero=" + numero + ", complemento=" + complemento + ", dataCriado=" + dataCriado
				+ ", dataOcorrencia=" + dataOcorrencia + ", descricaoGeral=" + descricaoGeral + ", status=" + status
				+ ", vitima=" + vitima + ", operador=" + operador + "]";
	}
}
