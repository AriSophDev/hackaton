document
                .getElementById("savingsForm")
                .addEventListener("submit", function (event) {
                    event.preventDefault(); // Previene el envío tradicional del formulario
                    calculateSavings();
                });

            // Función de formato para números grandes en COP (miles de pesos)
            function formatCOP(number) {
                // Usar Intl.NumberFormat para un formato de moneda correcto en Colombia
                return new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0, // Generalmente no se usan decimales en la práctica de facturas COP
                }).format(number);
            }

            function calculateSavings() {
                // 1. Obtener valores de entrada y convertirlos a números
                const currentConsumption = parseFloat(
                    document.getElementById("currentConsumption").value,
                );
                const currentCostPerKwh = parseFloat(
                    document.getElementById("currentCostPerKwh").value,
                );
                const efficiencyReduction = parseFloat(
                    document.getElementById("efficiencyReduction").value,
                );
                const renewableCostPerKwh = parseFloat(
                    document.getElementById("renewableCostPerKwh").value,
                );

                // 2. Cálculos de la Factura Actual
                const currentBill = currentConsumption * currentCostPerKwh;

                // 3. Cálculos del Escenario de Energía Renovable
                const newConsumption =
                    currentConsumption * (1 - efficiencyReduction / 100);
                const newBill = newConsumption * renewableCostPerKwh;

                // 4. Cálculos de Ahorro
                const monthlySavings = currentBill - newBill;
                const annualSavings = monthlySavings * 12;

                // 5. Mostrar Resultados en la Interfaz (Actualización del DOM)
                // Se usa la función formatCOP() para mostrar los valores con el símbolo y formato colombiano.
                document.getElementById("currentBill").textContent =
                    formatCOP(currentBill);
                document.getElementById("newConsumption").textContent =
                    `${newConsumption.toFixed(0)} kWh`;
                document.getElementById("newBill").textContent =
                    formatCOP(newBill);
                document.getElementById("monthlySavings").textContent =
                    formatCOP(monthlySavings);
                document.getElementById("annualSavings").textContent =
                    formatCOP(annualSavings);
            }

            // Inicializar la calculadora al cargar la página con los valores por defecto
            calculateSavings();