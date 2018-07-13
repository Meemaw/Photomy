import * as React from 'react';

const Disclaimer = props => {
  return (
    <React.Fragment>
      <h2>Disclaimer</h2>
      <p>
        To the maximum extent permitted by applicable law, we exclude all representations,
        warranties and conditions relating to our website and the use of this website (including,
        without limitation, any warranties implied by law in respect of satisfactory quality,
        fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer
        will:
      </p>
      <ol>
        <li>
          limit or exclude our or your liability for death or personal injury resulting from
          negligence;
        </li>
        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
        <li>
          limit any of our or your liabilities in any way that is not permitted under applicable
          law; or
        </li>
        <li>
          exclude any of our or your liabilities that may not be excluded under applicable law.
        </li>
      </ol>
      <p>
        The limitations and exclusions of liability set out in this Section and elsewhere in this
        disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities
        arising under the disclaimer or in relation to the subject matter of this disclaimer,
        including liabilities arising in contract, in tort (including negligence) and for breach of
        statutory duty.
      </p>
      <p>
        To the extent that the website and the information and services on the website are provided
        free of charge, we will not be liable for any loss or damage of any nature.
      </p>
    </React.Fragment>
  );
};

export default Disclaimer;
