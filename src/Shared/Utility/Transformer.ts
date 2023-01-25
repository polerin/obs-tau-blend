import {
  IAdapterEventTransformer,
  IAdapterRequestTransformer,
  IAdapterResponseTransformer,
  ServiceAdapterTransformer,
  TransformerClassifications,
  TransformerInterfaceType,
  TransformerRegistry,
} from "#infra";

export function buildTransformerRegistry(
  classification: TransformerClassifications,
  potential: (new (...args: any[]) => any)[]
): TransformerRegistry<typeof classification> {
  let transformers: TransformerRegistry<typeof classification> = {};
  
  for (const transformer of potential) {
    if (typeof transformer !== "function") {
      break;
    }

    const instance = new transformer();
    const subjectName = getTransformerSubject(classification, instance);

    if (subjectName) {
      transformers[subjectName] = instance;
    }
  }

  return transformers;
}

export function isTransformerType(classification: TransformerClassifications, subject: unknown): subject is TransformerInterfaceType<typeof classification> {
    switch(classification) {
       case 'event': return isEventTransformer(subject);
       case 'request': return isRequestTransformer(subject);
       case 'response': return isResponseTransformer(subject);
    }

    return false;
}

export function getTransformerSubject(classification: TransformerClassifications, subject: ServiceAdapterTransformer): string | false {
    const subjectMapping: Record<TransformerClassifications, string> = {
        event: 'adapterEventName',
        request: 'systemRequestName',
        response: 'adapterResponseName',
    };

    if (isTransformerType(classification, subject)) {
        // I really hate this
        return subject[(subjectMapping[classification] as keyof typeof subject)];
    }
 
     return false;
}

export function isEventTransformer(
  subject: unknown
): subject is IAdapterEventTransformer<any, any, any> {
  if (typeof subject !== "object") {
    return false;
  }

  const transformer = subject as IAdapterEventTransformer<any, any, any>;

  if (
    !(
      "adapterEventName" in transformer &&
      "systemEventName" in transformer &&
      "buildEventMessage" in transformer
    )
  ) {
    return false;
  }

  return true;
}

export function isRequestTransformer(
  subject: unknown
): subject is IAdapterRequestTransformer<any, any, any> {
  if (typeof subject !== "object") {
    return false;
  }

  const transformer = subject as IAdapterRequestTransformer<any, any, any>;

  if (
    !(
      "adapterRequestName" in transformer &&
      "systemRequestName" in transformer &&
      "buildRequestMessage" in transformer
    )
  ) {
    return false;
  }

  return true;
}

export function isResponseTransformer(
  subject: unknown
): subject is IAdapterResponseTransformer<any, any, any> {
  if (typeof subject !== "object") {
    return false;
  }

  const transformer = subject as IAdapterResponseTransformer<any, any, any>;

  if (
    !(
      "adapterResponseName" in transformer &&
      "systemResponseName" in transformer &&
      "buildResponseMessage" in transformer
    )
  ) {
    return false;
  }

  return true;
}
