import React from 'react';
import '../App.css';

function Form({ fields, title, buttons, onSubmit, formData, setFormData, selectOptions = {} }) {
  console.log(formData);

  return (
    <form onSubmit={onSubmit}>
      <div className="conteiner__form">
        <h3>{title}</h3>
        <div className="form__inputs">
          {/* Recorre cada campo definido en 'fields' y crea el input correspondiente */}
          {fields.map((field) => (
            <div key={field.name} className="form__inputs_section">
              {/* Etiqueta del input */}
              <label className="form__inputs-label" htmlFor={field.name}>
                {field.label}
              </label>
              {/* Renderiza el tipo de campo según 'field.type' */}
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  className="form__inputs-input"
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  required={field.required}
                  disabled={field.readOnly}
                >
                  <option value="">Seleccione una opción</option>
                  {/* Opciones del select que se pasan dinámicamente */}
                  {selectOptions[field.name] &&
                    selectOptions[field.name].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  className="form__inputs-input"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  required={field.required}
                  readOnly={field.readOnly}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="conteiner__buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            type={button.type || 'button'}
            className={`buttons-button ${button.className || ''}`}
            onClick={button.onClick || undefined}
            style={{ display: button.hidden ? 'none' : 'inline-block' }}
          >
            {button.text}
          </button>
        ))}
      </div>
    </form>
  );
}

export default Form;
