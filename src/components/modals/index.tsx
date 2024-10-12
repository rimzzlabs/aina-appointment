import { AlertDialog } from "../ui/alert-dialog";
import { ModalConfirmation } from "./modal-confirmation";

import { createPushModal } from "pushmodal";
import { ModalForm } from "./modal-form";
import { ModalView } from "./modal-view";

export const {
  pushModal,
  popModal,
  popAllModals,
  replaceWithModal,
  useOnPushModal,
  onPushModal,
  ModalProvider,
} = createPushModal({
  modals: {
    ModalConfirmation: {
      Wrapper: (props) => <AlertDialog {...props} />,
      Component: ModalConfirmation,
    },
    ModalForm: {
      Wrapper: (props) => <AlertDialog {...props} />,
      Component: ModalForm,
    },
    ModalView: {
      Wrapper: (props) => <AlertDialog {...props} />,
      Component: ModalView,
    },
  },
});
