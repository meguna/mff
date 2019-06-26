import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Plus, AlertCircle } from 'react-feather';
import Field from './components/Field';
import IngGroup from './components/IngGroup';
import IngFieldsHeader from './components/IngFieldsHeader';
import ImageUpload from './components/ImageUpload';
import FormSubHeader from './components/FormSubHeader';
import StatusInfo from '../common/StatusInfo';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';
import './styles.css';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

    const initialState = {
      notes: props.notes,
      name: props.name,
      size: props.size,
      groups: props.initialGroups,
      ingredients: props.initialIngredients,
      images: [],
      submitError: false,
      submitStatus: '',
      invalid: { name: false, ingCount: false },
    };

    this.state = {
      ...initialState,
      stateOnSubmit: initialState,
    };
  }

  onFieldChange = (param, val) => {
    this.setState({ [param]: val });
    this.validate();
  };

  onAddGroup = () => {
    this.setState(prevState => ({
      groups: [
        ...prevState.groups,
        {
          ...ING_GROUP_BLANK,
          groupId: prevState.groups.length + 1,
          elemId: prevState.groups[prevState.groups.length - 1].elemId + 1,
        },
      ],
      ingredients: [
        ...prevState.ingredients,
        [{
          ...ING_FIELD_BLANK,
          groupId: prevState.groups.length + 1,
        }],
      ],
    }));
  };

  onRemoveGroup = (groupId) => {
    const groupIndex = groupId - 1;
    const { ingredients, groups } = this.state;

    const ingRemoved = [
      ...ingredients.slice(0, groupIndex),
      ...ingredients.slice(groupIndex + 1),
    ];
    const groupRemoved = [
      ...groups.slice(0, groupIndex),
      ...groups.slice(groupIndex + 1),
    ];

    /**
     * If a user deletes a group by removing all of the ingredients in it,
     * then the groupIds will skip around. This reindexes group numbers,
     * starting with 1.
     */
    const ingReindex = ingRemoved.map((ingGroup, i) => {
      const group = [];
      for (let j = 0; j < ingGroup.length; j++) {
        group.push({ ...ingGroup[j], groupId: i + 1 });
      }
      return group;
    });

    const groupReindex = groupRemoved.map((group, i) => (
      { ...group, groupId: i + 1 }
    ));

    this.setState({
      ingredients: ingReindex,
      groups: groupReindex,
    });
  };

  onIngGroupUpdate = (ingredients, groupId, groupInfo) => {
    const newIng = ingredients.filter(ing => (
      !(ing.name === '' && ing.amount === '' && ing.notes === '')
    ));
    this.setState(prevState => ({
      ingredients: Object.assign(
        [], prevState.ingredients,
        { [groupId - 1]: newIng },
      ),
      groups: Object.assign(
        [], prevState.groups,
        { [groupId - 1]: { groupId, ...groupInfo } },
      ),
    }));
  };

  updateImageState = (images) => {
    this.setState({ images });
    return false;
  }

  validate = () => {
    const { name } = this.state;
    if (name === '') {
      this.setState(prevProps => ({
        invalid: { ...prevProps.invalid, name: true },
      }));
      return true;
    }
    this.setState(prevProps => ({
      invalid: { ...prevProps.invalid, name: false },
    }));
    return false;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      ingredients,
      groups,
      name,
      notes,
      size,
      images,
    } = this.state;

    const { fetchUrl } = this.props;

    /**
     * directly using the 'invalid' state parameter after calling
     * validate() can be buggy because the function is asynchronous.
     * Thus we directly take the return value of the function instead
    */
    if (this.validate()) {
      this.setState({ submitError: true });
      return;
    }

    const ingCollect = [].concat(...ingredients).filter((ing) => {
      return !(ing.name === '' && ing.amount === '' && ing.notes === '');
    });
    const groupCollect = (ingCollect.length === 0) ? [] : groups;

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        notes,
        size,
        ingredients: ingCollect,
        groups: groupCollect,
        images,
      }),
    })
      .then((res, err) => {
        if (res.ok) {
          const { stateOnSubmit } = this.state;
          this.setState({ ...stateOnSubmit, submitStatus: 'success' });
          window.scrollTo(0, 0);
          const { fetchRecipes, sortMethod } = this.props;
          fetchRecipes(sortMethod);
        } else {
          throw new Error(err);
        }
      })
      .catch((err) => {
        this.setState({ submitStatus: 'fail' });
        window.scrollTo(0, 0);
        console.error(err);
      });
  };

  render() {
    const {
      name,
      size,
      notes,
      groups,
      ingredients,
      invalid,
      submitError,
      submitStatus,
    } = this.state;

    const {
      title,
      messages,
    } = this.props;

    const groupFields = [];
    for (let i = 0; i < groups.length; i++) {
      groupFields.push(
        <div key={groups[i].elemId}>
          <IngGroup
            groupId={i + 1}
            onIngGroupUpdate={this.onIngGroupUpdate}
            onRemoveGroup={this.onRemoveGroup}
            ingredients={ingredients[i]}
            group={groups[i]}
          />
        </div>,
      );
    }

    return (
      <Fragment>
        <StatusInfo
          status={submitStatus}
          failMessage={messages.failMessage}
          successMessage={messages.successMessage}
        />
        <h1 className="title">{title}</h1>
        <FormSubHeader subtitle="info" />
        <form id="nr-form" onSubmit={this.onSubmit} autoComplete="off">
          <Field
            onChange={this.onFieldChange}
            value={name}
            name="name"
            id="nr-name-input"
            invalid={invalid.name}
            validString="a name is required!"
            onBlur={this.validate}
            required
          />
          <Field
            onChange={this.onFieldChange}
            value={size}
            name="size"
            id="nr-size-input"
            info={`
              Use this field creatively - for anything from serving count to 
              baking tray dimensions`}
          />
          <Field
            onChange={this.onFieldChange}
            value={notes}
            name="notes"
            id="nr-recipenotes-input"
            textarea
          />
          <fieldset className="ingredients-fieldset">
            <legend>
              <FormSubHeader subtitle="ingredients" />
            </legend>
            <IngFieldsHeader />
            {groupFields}
            <button
              className="add-ing-group-button"
              type="button"
              onClick={this.onAddGroup}
            >
              <Plus />
              add another ingredient group
            </button>
          </fieldset>

          <FormSubHeader subtitle="Images" />
          <ImageUpload onDone={this.updateImageState} />

          <FormSubHeader />
          <input type="submit" value={messages.buttonAction} />
          {submitError && (
            <p className="error-msg">
              <AlertCircle />
              Please complete the required fields.
            </p>
          )}
        </form>
      </Fragment>
    );
  }
}

RecipeForm.propTypes = {
  initialIngredients: PropTypes.arrayOf(PropTypes.array),
  initialGroups: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  notes: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  fetchUrl: PropTypes.string.isRequired,
  fetchRecipes: PropTypes.func,
  sortMethod: PropTypes.string,
  messages: PropTypes.shape({
    buttonAction: PropTypes.string,
    failMessage: PropTypes.string,
    successMessage: PropTypes.string,
  }).isRequired,
};

RecipeForm.defaultProps = {
  initialIngredients: [[{ ...ING_FIELD_BLANK }]],
  initialGroups: [{ ...ING_GROUP_BLANK }],
  notes: '',
  name: '',
  size: '',
  fetchRecipes: () => {},
  sortMethod: 'update_date',
};

export default RecipeForm;
