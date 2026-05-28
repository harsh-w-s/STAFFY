package com.staffy.app.filter;

import com.staffy.app.exception.ResourceNotFoundException;
import com.staffy.app.model.User;
import com.staffy.app.repository.UserRepository;
import com.staffy.app.security.CustomUserDetails;
import com.staffy.app.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        //if no authorization header, then don't check for jwt. later, SecurityConfig will
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwt = authHeader.substring(7);
        try {

            String username = jwtService.extractUsername(jwt);

            //fetch user from db using username
            User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User" +
                    " not found"));

            //CustomUserDetails object that will be stored in spring security context as principal
            CustomUserDetails customUserDetails =
                    new CustomUserDetails(user);

            //creating context for spring security
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            customUserDetails,
                            null,
                            customUserDetails.getAuthorities()
                    );

            SecurityContextHolder.getContext()
                    .setAuthentication(authToken);

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid JWT Token");
        }
    }

}
