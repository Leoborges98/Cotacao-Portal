package LeirozEVieira.Agroindustrial.CotacaoPortal.services;

import LeirozEVieira.Agroindustrial.CotacaoPortal.entities.TipoUsuario;
import LeirozEVieira.Agroindustrial.CotacaoPortal.entities.Usuario;
import LeirozEVieira.Agroindustrial.CotacaoPortal.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario cadastrar(String email, String nome, String senha) {

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email é obrigatório");
        }

        if (senha == null || senha.isBlank()) {
            throw new IllegalArgumentException("Senha é obrigatória");
        }

        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setNome(nome);
        usuario.setSenha(passwordEncoder.encode(senha)); // nunca salva senha crua
        usuario.setTipo(TipoUsuario.USER); // padrão pra todo cadastro público

        return usuarioRepository.save(usuario);
    }
}