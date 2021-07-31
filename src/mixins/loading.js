export default {
    methods: {
        isLoadingMethod(buttonclicked) {
            if (buttonclicked) {
              return {
                display: "block",
              };
            } else {
              return {
                display: "none",
              };
            }
          },
    }
}