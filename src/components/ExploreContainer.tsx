import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToast,
  IonLabel,
} from "@ionic/react";
import "./ExploreContainer.css";
import React from "react";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [formOptions, setFormOptions] = React.useState<{
    numberOfPeople: number | string | undefined | null;
    billTotal: number | string | undefined | null;
    tip: number | string | undefined | null;
    customTip: number | string | undefined | null;
  }>({
    numberOfPeople: 0,
    billTotal: 0,
    tip: "0.15",
    customTip: 0,
  });

  const customAlertOptions = {
    header: "Tip",
    subHeader: "Select the percentage of tip",
    message: "Choose only one",
    translucent: true,
  };

  const [results, setResults] = React.useState<{
    tipPerPerson: number | string | undefined | null;
    totalPerPerson: number | string | undefined | null;
    totalWithTip: number | string | undefined | null;
  }>({
    tipPerPerson: 0,
    totalPerPerson: 0,
    totalWithTip: 0,
  });

  const [showResults, setShowResults] = React.useState(true);
  const [showToast, setShowToast] = React.useState(false);

  function checkFields() {
    if (
      formOptions.numberOfPeople === undefined ||
      formOptions.numberOfPeople === null ||
      formOptions.numberOfPeople === 0 ||
      formOptions.billTotal === undefined ||
      formOptions.billTotal === null ||
      formOptions.billTotal === 0 ||
      formOptions.tip === undefined ||
      formOptions.tip === null ||
      formOptions.tip === 0
    ) {
      return true;
    } else {
      if (
        (formOptions.tip === "Other" && formOptions.customTip === 0) ||
        formOptions.customTip === undefined ||
        formOptions.customTip === null
      ) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="container">
      <IonGrid>
        <IonRow>
          <IonCol>
            <strong>Fill the inputs to calculate the tip per person</strong>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
          <IonCol size="12" sizeSm="10" sizeMd="8" sizeLg="6" >
            <IonInput
              label="Number of people"
              labelPlacement="floating"
              placeholder="Enter the number of people"
              inputMode="numeric"
              type="number"
              mode="md"
              fill="outline"
              clearOnEdit={true}
              value={formOptions.numberOfPeople}
              onIonChange={(e) =>
                setFormOptions({
                  ...formOptions,
                  numberOfPeople: e.detail.value,
                })
              }
            />
          </IonCol>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
        </IonRow>
        <IonRow>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
          <IonCol size="12" sizeSm="10" sizeMd="8" sizeLg="6" >
            <IonInput
              label="Bill total"
              labelPlacement="floating"
              placeholder="Enter the total of the bill"
              inputMode="decimal"
              type="number"
              mode="md"
              fill="outline"
              clearOnEdit={true}
              value={formOptions.billTotal}
              onIonChange={(e) =>
                setFormOptions({ ...formOptions, billTotal: e.detail.value })
              }
            />
          </IonCol>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
        </IonRow>
        <IonRow>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
          <IonCol size="12" sizeSm="10" sizeMd="8" sizeLg="6" >
            <IonSelect
              label="Tip"
              interfaceOptions={customAlertOptions}
              interface="alert"
              placeholder="Select One"
              mode="md"
              fill="outline"
              value={formOptions.tip}
              onIonChange={(e) =>
                setFormOptions({ ...formOptions, tip: e.detail.value })
              }
            >
              <IonSelectOption value="0">0 %</IonSelectOption>
              <IonSelectOption value="0.1">10 %</IonSelectOption>
              <IonSelectOption value="0.15">15 %</IonSelectOption>
              <IonSelectOption value="0.2">20 %</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonCol>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
        </IonRow>
        <IonRow>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
          <IonCol size="12" sizeSm="10" sizeMd="8" sizeLg="6" >
            <IonInput
              label="Custom tip"
              labelPlacement="floating"
              placeholder="Enter the custom tip"
              inputMode="decimal"
              type="number"
              mode="md"
              fill="outline"
              clearOnEdit={true}
              value={formOptions.customTip}
              onIonChange={(e) =>
                setFormOptions({ ...formOptions, customTip: e.detail.value })
              }
              disabled={formOptions.tip !== "Other"}
            />
          </IonCol>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
        </IonRow>
        <IonRow>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3" />
          <IonCol size="12" sizeSm="10" sizeMd="8" sizeLg="6">
            <IonButton
              expand="block"
              disabled={checkFields()}
              onClick={(e) => {
                e.preventDefault();
                let tip = 0 as number | string | undefined | null;
                if (formOptions.tip === "Other") {
                  tip = (formOptions.customTip as number) / 100;
                } else {
                  tip = formOptions.tip;
                }
                //check if number of people is greater than 0, if bill total is greater than 0 and if tip is greater than 0
                //if not raise a toast message
                if (
                  (formOptions.numberOfPeople as number) <= 0 ||
                  (formOptions.billTotal as number) <= 0 ||
                  (tip as number) <= 0
                ) {
                  setShowToast(true);
                  return;
                }

                const total =
                  (formOptions.billTotal as number) * (tip as number);
                const tipPerPerson =
                  total / (formOptions.numberOfPeople as number);

                const totalPerPerson =
                  (formOptions.billTotal as number) /
                    (formOptions.numberOfPeople as number) +
                  tipPerPerson;
                
                const totalWithTip = totalPerPerson * (formOptions.numberOfPeople as number);
                setResults({
                  tipPerPerson: tipPerPerson,
                  totalPerPerson: totalPerPerson,
                  totalWithTip: totalWithTip,
                });

                setShowResults(false);
              }}
            >
              Calculate Tip per person
            </IonButton>
            <IonToast
              isOpen={showToast}
              message="Some of the fields are empty or invalid. Please check and try again."
              onDidDismiss={() => setShowToast(false)}
              duration={5000}
              color="danger"
            />
          </IonCol>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3" />
        </IonRow>
        <IonRow>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
          <IonCol size="12" sizeSm="10" sizeMd="8" sizeLg="6" >
            <div hidden={showResults}>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Calculations</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                    <IonCol size="8">
                        <div style={{"display": "flex", "alignItems": "center", "alignContent": "center"}}>
                          <IonLabel>Tip per person</IonLabel>
                        </div>
                      </IonCol>
                      <IonCol size="4">
                        <IonInput
                          value={(results.tipPerPerson as number).toFixed(2)}
                          disabled
                          mode="md"
                          aria-label="Tip per person"
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="8">
                        <div style={{"display": "flex", "alignItems": "center", "alignContent": "center"}}>
                          <IonLabel>Total per person</IonLabel>
                        </div>
                      </IonCol>
                      <IonCol size="4">
                        <IonInput
                          value={(results.totalPerPerson as number).toFixed(2)}
                          disabled
                          mode="md"
                          aria-label="Total per person"
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol size="8">
                        <div style={{"display": "flex", "alignItems": "center", "alignContent": "center"}}>
                          <IonLabel>Total Bill</IonLabel>
                        </div>
                      </IonCol>
                      <IonCol>
                        <IonInput
                          value={(results.totalWithTip as number).toFixed(2)}
                          disabled
                          mode="md"
                          aria-label="Total bill"
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          fill="outline"
                          expand="block"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowResults(true);
                            setFormOptions({
                              numberOfPeople: 0,
                              billTotal: 0,
                              tip: "0.1",
                              customTip: 0,
                            });
                            setResults({
                              tipPerPerson: 0,
                              totalPerPerson: 0,
                              totalWithTip: 0,
                            });
                          }}
                        >
                          Clear
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </div>
          </IonCol>
          <IonCol size="0" sizeSm="1" sizeMd="2" sizeLg="3"  />
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ExploreContainer;
