import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Header from '../../CommonComponnet/Header';
import Label from '../../CommonComponnet/Label';

const Faq = () => {
  return (
    <View style={styles.main}>
      <Header title="FAQ" />
      <ScrollView style={{flex: 1, paddingBottom: verticalScale(160)}}>
        <View style={styles.sub_Main}>
          <Label
            styles={styles.f_Title}
            title={'Vyvamind Safety and Efficacy Questions'}
          />
          <Label
            title={'Q1. Is Vyvamind a controlled substance?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              'Updated 02/02/2022 in accordance with FDA guideance. Vyvamind is a neurostimulant which is neither a banned substance, nor does it contain any substances banned under US law. No ingredient is listed within the Dietary Supplement Ingredient Advisory List or Controlled Substance List. Each capsule is formulated in FDA compliant facilities with cGMP approval. This means that Vyvamind is safe for anyone looking to improve mental function, focus, mood and energy levels using a safe product available to order.'
            }
          />
          <Label
            title={'Q2. Are there any side effects of Vyvamind?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              "Vyvamind prides itself on being a nutraceutical that doesn't cause unwanted side effects. If side effects do occur stop taking the supplement immediately and contact us here. Because each compound within Vyvamind is completely natural however, side effects are extremely rare and as long as you are 18+, not pregnant or breastfeeding then Vyvamind is safe."
            }
          />
          <Label
            title={'Q3. How quickly does Vyvamind take effect?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              'Please be aware that Vyvamind can have the desired effects in as little as 10 minutes.'
            }
          />
          <Label
            title={'Q4. How do I take Vyvamind?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              'Take 1 or 2 capsules with water. Each bottle contains 30 servings or 60 capsules which can be taken as a single dose or doubled up whenever you need the energy, focus and boost.'
            }
          />
          <Label
            title={'Q5. Do I need a prescription to get Vyvamind?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              'Currently you do not need a prescription to order Vyvamind.'
            }
          />
          <Label
            title={'Q5. Is Vyvamind legal in my state?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={'Updated 20/10/2022: Vyvamind is legal in all states.'}
          />

          <Label
            title={'Q6. Where is Vyvamind Manufacturered and Made?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              'Vyvamind is manufactured in the United States of America. Our manufacturing facility is located in the state of Florida. We use multiple secure storage and fulfillment sites to ship out orders to customers and do not send directly from the manufacturer.'
            }
          />
          <Label
            styles={{
              fontWeight: 'bold',
              fontSize: scale(17),
              marginVertical: verticalScale(10),
              alignSelf: 'center',
            }}
            title={'Shipping and Order Questions'}
          />
          <Label
            title={'Q1. Where is my order?'}
            styles={{
              fontWeight: 'bold',
              fontSize: scale(14),
              opacity: 0.7,
            }}
          />
          <Label
            styles={styles.a_Label}
            title={
              'Orders are normally shipped within 24-48 hours after being placed. We ship with USPS using tracked and verified methods that allow for your product to arrive safely and without the risk of any temprature damage or contaminantion. Orders normally arrive in 1-3 business days. However can sometimes take longer. If your order has been over 6 business days then please contact us using hello[@]sapnutra.com stating your order number, name and address.'
            }
          />
          <Label
            title={'Q2. Is Vyvamind packaging discreet?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              'We ship all Vyvamind bottles in plain cardboard packaging ensuring customer privacy.'
            }
          />
          <Label
            title={'Q3. How long do orders take to arrive?'}
            styles={styles.q_Label}
          />
          <Label
            styles={styles.a_Label}
            title={
              'Most orders arrive between 1-3 business days. Please note we do not dispatch orders on weeekends. If your order has been longer than 6 business days please contact us.'
            }
          />
          <Label title={'Q4. Can I track my order?'} styles={styles.q_Label} />
          <Label
            styles={styles.a_Label}
            title={
              'Yes all orders are sent via tracked methods to ensure sucessful and safe delviery. Please try to ensure you are on hand to recieve the package.'
            }
          />
          <Label
            title={'Q5. Do you ship internationally?'}
            styles={styles.q_Label}
          />

          <Label
            styles={styles.a_Label}
            title={
              'We will be testing international shipments soon. This will come with a shipping charge.'
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  sub_Main: {
    width: '100%',
    height: '100%',
    padding: scale(10),
  },
  f_Title: {
    fontWeight: 'bold',
    fontSize: scale(17),
    opacity: 0.8,
    color: '#000',
  },
  q_Label: {
    fontWeight: 'bold',
    fontSize: scale(14),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(2),
    opacity: 0.7,
    color: '#000',
  },
  a_Label: {
    fontSize: scale(12),
    color: '#000',
    opacity: 0.7,
  },
});

export default Faq;
