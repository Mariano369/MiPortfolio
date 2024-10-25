import baseClasses from '@components/Themes/layout.module.scss'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { addTools, editTools, loadTools, removeTool, searchTools } from '@store/actions/toolsActions'
import { IToolsItem } from '@store/models'
import { IState } from '@store/reducers/index'
import MiPortfoliomodulescss from 'dist/css/MiPortfolio.module.scss'
import React, { FunctionComponent } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const Tools: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const toolsData = useSelector((state: IState) => state.tools)
  const initialDataTools = {
    Name: '',
    upNotes: '',
    NewField: '',
  }
  const [Toolsdata, setToolsdata] = React.useState<any>(initialDataTools)
  const handleToolsChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Toolsdata[name]) {
        setToolsdata((oldValues) => {
          return {
            ...oldValues,
            [name]: value,
          }
        })
      }
      resolve(value)
    })
  }
  const theme = { ...baseClasses, ...MiPortfoliomodulescss }
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForTools = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogToolsAction, setdialogToolsAction] = React.useState<'add' | 'edit' | 'view' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const upNotesTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const NewFieldTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchTools(options) : loadTools(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <div data-title="div" className={theme.mainarea}>
          <div data-title="Head" className={theme.tableHeading}>
            <Typography variant="h4">Tool list</Typography>

            <TextField
              id="searchField-Tool-"
              variant="outlined"
              placeholder="Search Tool..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForTools}
            />

            <LocalAddDialog
              isOpen={dialogToolsAction !== ''}
              onOpen={() => setdialogToolsAction('add')}
              onSave={() => setdialogToolsAction('')}
              onClose={() => setdialogToolsAction('')}
              action={dialogToolsAction}
              addOptions={{ title: 'Add Tool', text: 'Enter Tool data', button: 'Add' }}
              editOptions={{ title: 'Edit Tool', text: 'Update Tool data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: IToolsItem) => {
                if (dialogToolsAction === 'delete') {
                  dispatch(removeTool(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogToolsAction === 'add' ? dispatch(addTools(cleanData)) : dispatch(editTools(cleanData))
                }
              }}
              color="primary"
              data={Toolsdata}
              initialData={initialDataTools}
              setData={setToolsdata}
              allowMultipleSubmit={dialogToolsAction === 'add'}
              disabledFields={dialogToolsAction === 'view'}
            >
              <TextField
                margin="dense"
                size="medium"
                label="Name"
                type="text"
                fullWidth
                className={'field_Name'}
                variant="standard"
                value={Toolsdata.Name || ''}
                onChange={handleToolsChange('Name')}
                error={Toolsdata?.errField === 'Name'}
                helperText={Toolsdata?.errField === 'Name' && Toolsdata.errMessage}
              />

              <NumericFormat
                value={Toolsdata.upNotes || 0}
                label="upNotes"
                fullWidth
                className={'field_upNotes'}
                decimalSeparator=","
                customInput={TextField}
                onValueChange={(values, sourceInfo) => {
                  handleToolsChange('upNotes')(values.floatValue || 0)
                }}
                {...upNotesTextFieldProps}
              />

              <NumericFormat
                value={Toolsdata.NewField || 0}
                label="New Field"
                fullWidth
                className={'field_NewField'}
                decimalSeparator=","
                customInput={TextField}
                onValueChange={(values, sourceInfo) => {
                  handleToolsChange('NewField')(values.floatValue || 0)
                }}
                {...NewFieldTextFieldProps}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  allowSorting
                  tableData={toolsData.foundtools.length ? toolsData.foundtools : (toolsData.tools as any)}
                  pages={Math.ceil(toolsData.totalDocs / tableloadoptions.limit)}
                  columnInfo={[
                    {
                      id: 'Name',
                      header: 'Name',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() || '---'
                      },
                    },

                    {
                      id: 'upNotes',
                      header: 'upNotes',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() ? <NumericFormat value={cell.getValue()} displayType="text" decimalSeparator="," /> : '---'
                      },
                    },

                    {
                      id: 'NewField',
                      header: 'New Field',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() ? <NumericFormat value={cell.getValue()} displayType="text" decimalSeparator="," /> : '---'
                      },
                    },
                  ]}
                  onRequestPaginate={(options) => {
                    settableloadoptions({ ...tableloadoptions, ...options })
                  }}
                  onRequestEdit={(row) => {
                    setToolsdata(row)
                    setdialogToolsAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removeTool(row))
                  }}
                  onRequestSort={(property) => {
                    settableloadoptions({
                      ...tableloadoptions,
                      sort: {
                        field: property,
                        method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'asc',
                      },
                    })
                  }}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Tools
