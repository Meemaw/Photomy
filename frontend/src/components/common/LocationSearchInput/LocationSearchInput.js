// @flow
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';
import IconFormLabel from '../../common/IconFormLabel';

type Props = {
  address: string,
  handleChange: Function,
  handleSelect: Function,
  handleError: Function,
  handleCloseClick: Function,
  errorMessage: string,
  placeholder: ?string,
  label?: ?string,
};

const LocationSearchInput = ({
  address,
  errorMessage,
  handleChange,
  handleSelect,
  handleError,
  handleCloseClick,
  placeholder,
  label,
}: Props) => {
  return (
    <Style>
      {label && <IconFormLabel label={label} icon="marker" style={{ marginBottom: '10px' }} />}

      <PlacesAutocomplete
        onChange={handleChange}
        value={address}
        onSelect={handleSelect}
        onError={handleError}
        shouldFetchSuggestions={address.length > 1}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          return (
            <div>
              <div className="Demo__search-input-container">
                <input
                  {...getInputProps({
                    placeholder,
                    className: 'Demo__search-input',
                  })}
                />
                {address.length > 0 && (
                  <button className="Demo__clear-button" onClick={handleCloseClick}>
                    x
                  </button>
                )}
              </div>
              {suggestions.length > 0 && (
                <div className="Demo__autocomplete-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'Demo__suggestion-item Demo__suggestion-item--active'
                      : 'Demo__suggestion-item';

                    return (
                      /* eslint-disable react/jsx-key */
                      <div {...getSuggestionItemProps(suggestion, { className })}>
                        <strong>{suggestion.formattedSuggestion.mainText}</strong>{' '}
                        <small>{suggestion.formattedSuggestion.secondaryText}</small>
                      </div>
                    );
                    /* eslint-enable react/jsx-key */
                  })}
                </div>
              )}
            </div>
          );
        }}
      </PlacesAutocomplete>
      {errorMessage.length > 0 && <div className="Demo__error-message">{errorMessage}</div>}
    </Style>
  );
};

LocationSearchInput.defaultProps = {
  placeholder: 'Search Places...',
};

const Style = styled.div`
  .Demo__search-input-container {
    position: relative;
  }

  .Demo__search-input,
  .Demo__search-input:focus,
  .Demo__search-input:active {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    border: honeydew;
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 0.8rem;
    border-radius: 2px;
    outline: none;
  }

  .Demo__clear-button,
  .Demo__clear-button:active,
  .Demo__clear-button:focus {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    outline: none;
    font-weight: 600;
    color: #999;
  }

  .Demo__autocomplete-container {
    border-bottom: honeydew;
    border-left: honeydew;
    border-right: honeydew;
    border-top: 1px solid #e6e6e6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 2px 2px;
  }

  .Demo__suggestion-item {
    padding: 8px;
    text-align: left;
    background-color: #fff;
    cursor: pointer;
  }

  .Demo__suggestion-item--active {
    background-color: #fafafa;
  }

  .Demo__error-message {
    color: red;
  }
`;

export default LocationSearchInput;
