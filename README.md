# KidBum CALC 🩺

**Creada por Leonardo Alvizo Velázquez.**

Aplicación web progresiva (PWA) gratuita de calculadoras médicas, orientada al uso educativo y al apoyo en razonamiento clínico. Versión **0.1.1**.

**Sitio web:** al activar GitHub Pages para `main` y `/(root)`, la dirección será la indicada por GitHub Pages.

## Contenido

- Brecha aniónica (corrección por albúmina), osmolalidad, IMC, superficie corporal, presión arterial media e índice de choque.
- CKD-EPI 2021, Cockcroft-Gault, FIB-4, qSOFA, CURB-65 y Glasgow.
- Buscador, favoritos, tema oscuro y cálculos locales, sin consumo de una API de pago.

## Publicación en GitHub Pages

1. Publicar estos archivos en la raíz de la rama `main` de un repositorio público.
2. En `Settings → Pages`, configurar `Deploy from a branch`, rama `main`, carpeta `/(root)`.
3. Abrir la dirección HTTPS de GitHub Pages en Chrome para Android y elegir `Instalar aplicación` o `Agregar a pantalla principal`.
4. Abrir la aplicación una vez con conexión para activar la disponibilidad sin conexión.

## Verificación
La versión 0.1.1 usa un archivo `index.html` autocontenido. Se realizaron 19 pruebas de cálculo durante el desarrollo; no representa validación clínica institucional.

## Privacidad y seguridad clínica

No enviar datos identificables de pacientes. Esta aplicación no almacena valores clínicos ni los envía a servidores externos para calcular. Únicamente guarda preferencias del tema y favoritos en el navegador.

**No es un dispositivo médico validado ni reemplaza la valoración clínica, la supervisión o los protocolos institucionales.** Las fórmulas y escalas requieren corroboración de indicaciones, contexto y limitaciones. El código se publica sin una licencia de reutilización expresamente concedida.

## Novedades v0.2.0

NEWS2 (ambas escalas de saturación según indicación), Wells TVP, Wells embolia pulmonar, PERC para riesgo preprueba bajo, Child-Pugh y sodio corregido por hiperglucemia. Las decisiones clínicas requieren juicio del equipo tratante; las calculadoras no sustituyen guías ni protocolos institucionales. Se añadieron 17 comprobaciones de regresión y casos límite en el motor durante el desarrollo.
