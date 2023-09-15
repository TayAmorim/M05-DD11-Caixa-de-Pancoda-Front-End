import colors from "./colors.js";

function initColor() {
  const styles = document.createElement("style");
  styles.textContent = `
    :root {
      --pink-dark: ${colors.Pink.dark};
      --pink-normal: ${colors.Pink.normal};
      --pink-light: ${colors.Pink.light};
      --green-dark: ${colors.Green.dark};
      --green-normal: ${colors.Green.normal};
      --green-light: ${colors.Green.light};
      --grey-1: ${colors.Grey.a};
      --grey-2: ${colors.Grey.b};
      --grey-3: ${colors.Grey.c};
      --grey-4: ${colors.Grey.d};
      --grey-5: ${colors.Grey.e};
      --grey-6: ${colors.Grey.f};
      --grey-7: ${colors.Grey.g};
      --grey-8: ${colors.Grey.h};
      --wine-normal: ${colors.Wine.normal};
      --wine-light: ${colors.Wine.light};
      --wine-dimmed: ${colors.Wine.dimmed};
      --yellow-normal: ${colors.Yellow.normal};
      --yellow-light: ${colors.Yellow.light};
      --yellow-dimmed: ${colors.Yellow.dimmed};
      --greenSupport-normal: ${colors.GreenSupport.normal};
      --greenSupport-light: ${colors.GreenSupport.light};
      --greenSupport-dimmed: ${colors.GreenSupport.dimmed};
    }
  `;

  document.head.appendChild(styles);
}

export default initColor;
