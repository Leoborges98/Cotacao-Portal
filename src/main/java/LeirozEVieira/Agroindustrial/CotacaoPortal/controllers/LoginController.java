package LeirozEVieira.Agroindustrial.CotacaoPortal.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        @RequestParam String role,
                        HttpSession session) {

        // LOGIN FORNECEDOR
        if (role.equals("fornecedor") && username.equals("fornecedor") && password.equals("1234")) {
            session.setAttribute("usuarioLogado", username);
            session.setAttribute("tipoUsuario", "fornecedor");
            return "redirect:/fornecedor"; // abre tela do fornecedor
        }

        // LOGIN COLABORADOR
        if (role.equals("colaborador") && username.equals("admin") && password.equals("1234")) {
            session.setAttribute("usuarioLogado", username);
            session.setAttribute("tipoUsuario", "colaborador");
            return "redirect:/colaborador"; // abre tela do colaborador
        }

        // Login inválido
        return "redirect:/"; // volta para a tela de login
    }
}
