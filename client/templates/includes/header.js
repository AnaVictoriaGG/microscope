//ian:accounts-ui-bootstrap-3


Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'Nombre',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Por favor, introduce tu nombre.");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'last-name',
        fieldLabel: 'Apellidos',
        inputType: 'text',
        visible: true,
    }, {
        fieldName: 'gender',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Género',
        inputType: 'radio',
        radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'Masculino',          // label for the radio element
            value: 'm'              // value of the radio element, this will be saved.
          }, {
            id: 2,
            label: 'Femenino',
            value: 'f',
            checked: 'checked'
        }],
        visible: true
    }, {
        fieldName: 'country',
        fieldLabel: 'País',
        inputType: 'select',
        showFieldLabel: true,
        empty: 'Por favor, selecciona tu país de residencia',
        data: [{
            id: 1,
            label: 'Estados Unidos',
            value: 'us'
          }, {
            id: 2,
            label: 'España',
            value: 'es',
        }],
        visible: true
    }, {
        fieldName: 'terms',
        fieldLabel: 'Acepto la política de privacidad.',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('Debes aceptar la política de privacidad.');
                return false;
            }
        }
    }]
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  //Router.go('home');
  alert("adios!")
}