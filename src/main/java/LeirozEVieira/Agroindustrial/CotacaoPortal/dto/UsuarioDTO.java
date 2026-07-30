package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;

import LeirozEVieira.Agroindustrial.CotacaoPortal.entities.Usuario;
import LeirozEVieira.Agroindustrial.CotacaoPortal.entities.Usuario.TipoUsuario;

public class UsuarioDTO {

    private String email;
    private String nome;
    private String senha;
    private Usuario.TipoUsuario tipo;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public TipoUsuario getTipo() {
    return tipo;
}

public void setTipo(TipoUsuario tipo) {
    this.tipo = tipo;
}
}