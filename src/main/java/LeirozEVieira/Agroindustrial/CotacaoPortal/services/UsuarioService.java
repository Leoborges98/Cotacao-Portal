package LeirozEVieira.Agroindustrial.CotacaoPortal.services;

import LeirozEVieira.Agroindustrial.CotacaoPortal.dto.UsuarioDTO;
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

    public Usuario cadastrar(UsuarioDTO dto) {

        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email é obrigatório");
        }

        if (dto.getSenha() == null || dto.getSenha().isBlank()) {
            throw new IllegalArgumentException("Senha é obrigatória");
        }

        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(dto.getEmail());
        usuario.setNome(dto.getNome());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha())); // nunca salva senha crua
        usuario.setTipo(Usuario.TipoUsuario.USER);

        return usuarioRepository.save(usuario);
    }
}